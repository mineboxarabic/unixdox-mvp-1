import { GoogleGenerativeAI } from '@google/generative-ai';
import { DocumentType } from '@prisma/client';
import { prisma } from '@/shared/config/prisma';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export interface ExtractedMetadata {
  type?: DocumentType;
  dateExpiration?: Date;
  tags?: string[];
  metadata?: Record<string, any>;
  isDocument?: boolean; // Whether the AI determines this is a valid document
}

export interface SimplifiedDocument {
  id: string;
  type: DocumentType;
  tags: string[];
  nomFichier: string;
  metadata?: any;
}

export interface MatchingResult {
  matches: Record<string, string>; // Requirement -> Document ID
  missing: string[]; // List of missing requirements
  replacements: Record<string, { docId: string; reason: string }>; // Requirement -> { docId, reason }
}

export class AIService {
  // Updated model list with valid Gemini API model names
  // Priority: stable models first, then fallback options
  private models = [
    'gemini-2.5-flash',         // Latest stable flash model
  ];

  async matchDocumentsToRequirements(
    requiredTypes: string[],
    userDocuments: SimplifiedDocument[]
  ): Promise<MatchingResult> {
    const matches: Record<string, string> = {};
    const missing: string[] = [];
    const replacements: Record<string, { docId: string; reason: string }> = {};

    // 1. Exact Matching
    for (const req of requiredTypes) {
      // Try to find a document with the exact same type
      // We look for a document where the type matches the requirement string
      // Note: This assumes requiredTypes are strings that match DocumentType enum values
      const exactMatch = userDocuments.find(doc => doc.type === req);

      if (exactMatch) {
        matches[req] = exactMatch.id;
      } else {
        missing.push(req);
      }
    }

    // 2. AI Fallback for Missing Documents
    if (missing.length > 0 && userDocuments.length > 0) {
      try {
        // Filter out documents that are already used in exact matches to avoid duplicates?
        // Or keep them available if one doc can serve multiple purposes? 
        // Let's keep them available but prioritize unused ones in the prompt logic if needed.
        // For now, we send all documents to give AI full context.

        const prompt = this.getMatchingPrompt(missing, userDocuments);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' }); // Use fast stable model for matching

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log('AI Matching Response:', text);

        const aiSuggestions = this.parseMatchingResponse(text);

        // Merge AI suggestions
        for (const req of missing) {
          if (aiSuggestions[req]) {
            const suggestion = aiSuggestions[req];
            // Verify the suggested doc exists
            const docExists = userDocuments.find(d => d.id === suggestion.docId);
            if (docExists) {
              matches[req] = suggestion.docId;
              replacements[req] = {
                docId: suggestion.docId,
                reason: suggestion.reason
              };
              // Remove from missing list
              const index = missing.indexOf(req);
              if (index > -1) {
                missing.splice(index, 1);
              }
            }
          }
        }

      } catch (error) {
        console.error('AI Matching Error:', error);
        // If AI fails, we just return what we have (exact matches) and leave the rest as missing
      }
    }

    return { matches, missing, replacements };
  }

  private getMatchingPrompt(missingRequirements: string[], userDocuments: SimplifiedDocument[]): string {
    const docsJson = JSON.stringify(userDocuments.map(d => ({
      id: d.id,
      type: d.type,
      name: d.nomFichier,
      tags: d.tags,
      metadata: d.metadata
    })), null, 2);

    return `
      I have a list of missing document requirements for a procedure and a list of available user documents.
      Please analyze if any of the available documents can serve as a valid substitute or replacement for the missing requirements.

      Missing Requirements: ${JSON.stringify(missingRequirements)}

      Available User Documents:
      ${docsJson}

      Rules:
      1. Look for semantic matches (e.g., "PASSEPORT" is a valid "Pièce d'identité").
      2. Look for metadata matches (e.g., a document named "Facture EDF" is a "JUSTIFICATIF_DOMICILE").
      3. Only suggest a match if you are confident it is a valid substitute.
      4. Return a JSON object where keys are the missing requirements and values are objects with "docId" and "reason".

      Example Output:
      {
        "CARTE_IDENTITE": {
          "docId": "12345",
          "reason": "Passport is a valid alternative for Identity Card"
        }
      }

      Return ONLY the JSON.
    `;
  }

  private parseMatchingResponse(text: string): Record<string, { docId: string; reason: string }> {
    try {
      const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanText);
    } catch (error) {
      console.error('Failed to parse AI matching response:', text);
      return {};
    }
  }

  // Helper function to delay execution
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Check if error is a rate limit error
  private isRateLimitError(error: unknown): boolean {
    if (!error) return false;
    const status = (error as { status?: number })?.status;
    const message = error instanceof Error ? error.message : String(error);
    return status === 429 || message.includes('429') || message.includes('Too Many Requests') || message.includes('quota');
  }

  async extractDocumentMetadata(
    fileBuffer: Buffer,
    mimeType: string,
    currentType: DocumentType
  ): Promise<ExtractedMetadata> {
    let lastError: unknown;
    const maxRetries = 3;
    const baseDelayMs = 2000; // Start with 2 second delay

    // Fetch available tags
    const availableTags = await prisma.tag.findMany({ select: { name: true } });
    const tagList = availableTags.map(t => t.name);

    for (const modelName of this.models) {
      for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
          console.log(`Attempting AI extraction with model: ${modelName} (attempt ${attempt + 1}/${maxRetries})`);
          const model = genAI.getGenerativeModel({ model: modelName });

          const prompt = this.getPromptForType(currentType, tagList);
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
        } catch (error: unknown) {
          // Log detailed error information for debugging
          console.error(`AI Extraction Error with ${modelName} (attempt ${attempt + 1}):`, error);
          console.error({
            status: (error as { status?: number })?.status,
            statusText: (error as { statusText?: string })?.statusText,
            message: error instanceof Error ? error.message : String(error),
          });
          lastError = error;

          // If it's a rate limit error, wait and retry
          if (this.isRateLimitError(error) && attempt < maxRetries - 1) {
            const delayTime = baseDelayMs * Math.pow(2, attempt); // Exponential backoff: 2s, 4s, 8s
            console.log(`Rate limited. Waiting ${delayTime}ms before retry...`);
            await this.delay(delayTime);
            continue;
          }

          // For non-rate-limit errors, break out of retry loop and try next model
          break;
        }
      }
    }

    throw lastError;
  }

  private getPromptForType(type: DocumentType, availableTags: string[]): string {
    const documentTypes = Object.values(DocumentType).join(', ');
    const tagsInstruction = availableTags.length > 0
      ? `Choose tags ONLY from this list: [${availableTags.join(', ')}]. Do not invent new tags.`
      : `Suggest relevant tags (max 5).`;

    const basePrompt = `
      Analyze this image carefully. First, determine if this is a valid document.
      A valid document is an official or semi-official paper such as: ID cards, passports, invoices, contracts, certificates, pay slips, insurance documents, bank statements, etc.
      NOT valid documents: random photos, selfies, screenshots of apps/games, memes, artwork, landscapes, or any non-document images.
      
      Return a JSON object with the following structure:
      {
        "isDocument": true/false,
        "suggestedType": "One of the following: ${documentTypes}",
        "dateExpiration": "YYYY-MM-DD (if applicable, e.g. for ID, Passport, Insurance)",
        "tags": ["array", "of", "relevant", "keywords", "max 5"],
        "metadata": {
          // Specific fields based on document type
        }
      }

      IMPORTANT: If "isDocument" is false, set "suggestedType" to "AUTRE" and leave "metadata" empty.
      ${tagsInstruction}
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
      case 'CARTE_VITALE':
      case 'ACTE_NAISSANCE':
      case 'ACTE_MARIAGE':
      case 'DIPLOME':
      case 'ATTESTATION_TRAVAIL':
        specificInstructions = `
          For metadata, extract:
          - nom (string, last name)
          - prenom (string, first name)
          - numero (string, document number if applicable)
          - dateNaissance (YYYY-MM-DD, if applicable)
          - lieuNaissance (string, if applicable)
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
          
          If this appears to be an identity document (ID card, passport, driver's license, etc.), extract:
          - nom (string, last name)
          - prenom (string, first name)
          - numero (string, document number if applicable)
          - dateNaissance (YYYY-MM-DD, if applicable)
          - lieuNaissance (string, if applicable)
          
          If this appears to be an invoice or bill, extract:
          - amount (number)
          - currency (string, e.g. EUR, USD)
          - date (YYYY-MM-DD)
          - vendorName (string)
          - invoiceNumber (string)
        `;
        break;
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
        // Default to true if not specified for backwards compatibility
        isDocument: json.isDocument !== false,
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

