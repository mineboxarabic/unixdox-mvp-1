import { GoogleGenerativeAI } from '@google/generative-ai';
import { DocumentType } from '@prisma/client';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export interface ExtractedMetadata {
  type?: DocumentType;
  dateExpiration?: Date;
  tags?: string[];
  metadata?: Record<string, any>;
}

export class AIService {
  private models = ['gemini-2.0-flash-exp', 'gemini-1.5-flash', 'gemini-1.5-flash-001', 'gemini-1.5-pro'];

  async extractDocumentMetadata(
    fileBuffer: Buffer,
    mimeType: string,
    currentType: DocumentType
  ): Promise<ExtractedMetadata> {
    let lastError;

    for (const modelName of this.models) {
      try {
        console.log(`Attempting AI extraction with model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        
        const prompt = this.getPromptForType(currentType);
        const imagePart = {
          inlineData: {
            data: fileBuffer.toString('base64'),
            mimeType,
          },
        };

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const text = response.text();
        
        console.log('AI Raw Response:', text); // Debug log

        return this.parseResponse(text);
      } catch (error) {
        console.error(`AI Extraction Error with ${modelName}:`, error);
        lastError = error;
        // Continue to next model
      }
    }

    throw lastError;
  }

  private getPromptForType(type: DocumentType): string {
    const basePrompt = `
      Analyze this document image. Extract relevant information in JSON format.
      
      Return a JSON object with the following structure:
      {
        "suggestedType": "One of the following: FACTURE, CONTRAT, CARTE_IDENTITE, PASSEPORT, JUSTIFICATIF_DOMICILE, ACTE_NAISSANCE, ACTE_MARIAGE, DIPLOME, ATTESTATION_TRAVAIL, FICHE_PAIE, RELEVE_BANCAIRE, ASSURANCE, PERMIS_CONDUIRE, CARTE_VITALE, AUTRE",
        "dateExpiration": "YYYY-MM-DD (if applicable, e.g. for ID, Passport, Insurance)",
        "tags": ["array", "of", "relevant", "keywords", "max 5"],
        "metadata": {
          // Specific fields based on document type
        }
      }
    `;

    let specificInstructions = '';

    switch (type) {
      case 'FACTURE':
        specificInstructions = `
          For metadata, extract:
          - amount (number)
          - currency (string, e.g. EUR, USD)
          - date (YYYY-MM-DD)
          - vendorName (string)
          - invoiceNumber (string)
        `;
        break;
      case 'CARTE_IDENTITE':
      case 'PASSEPORT':
      case 'PERMIS_CONDUIRE':
        specificInstructions = `
          For metadata, extract:
          - nom (string)
          - prenom (string)
          - numero (string, document number)
          - dateNaissance (YYYY-MM-DD)
          - lieuNaissance (string)
        `;
        break;
      case 'CONTRAT':
        specificInstructions = `
          For metadata, extract:
          - parties (array of strings)
          - dateSignature (YYYY-MM-DD)
          - dateDebut (YYYY-MM-DD)
          - dateFin (YYYY-MM-DD)
        `;
        break;
      case 'ASSURANCE':
        specificInstructions = `
          For metadata, extract:
          - assureur (string)
          - numeroPolice (string)
          - typeAssurance (string)
          - dateEcheance (YYYY-MM-DD)
        `;
        break;
      case 'FICHE_PAIE':
        specificInstructions = `
          For metadata, extract:
          - employeur (string)
          - periode (string)
          - netAPayer (number)
        `;
        break;
      default:
        specificInstructions = `
          Extract any clearly identifiable key-value pairs into the metadata object.
          If the document type seems wrong, suggest the correct one in suggestedType.
        `;
    }

    return `${basePrompt}\n${specificInstructions}\n\nIMPORTANT: Return ONLY the JSON string, no markdown formatting.`;
  }

  private parseResponse(text: string): ExtractedMetadata {
    try {
      // Clean up markdown code blocks if present
      const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const json = JSON.parse(cleanText);

      const result: ExtractedMetadata = {
        tags: json.tags,
        metadata: json.metadata,
      };

      if (json.suggestedType && Object.values(DocumentType).includes(json.suggestedType)) {
        result.type = json.suggestedType as DocumentType;
      }

      if (json.dateExpiration) {
        const date = new Date(json.dateExpiration);
        if (!isNaN(date.getTime())) {
          result.dateExpiration = date;
        }
      }

      return result;
    } catch (error) {
      console.error('Failed to parse AI response:', text);
      throw new Error('Invalid JSON response from AI');
    }
  }
}

export const aiService = new AIService();
