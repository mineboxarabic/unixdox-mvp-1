# AI Document Extraction Plan

This plan outlines the steps to integrate Gemini AI for automatically extracting attributes from uploaded documents.

## 1. Database Schema Updates

We need a place to store the extracted attributes. Since the attributes vary by document type, a JSON field is appropriate.

### `prisma/schema.prisma`

- Add `metadata` field to `Document` model.
- Add `extractionStatus` field to track if AI processing succeeded.

```prisma
enum ExtractionStatus {
  PENDING
  COMPLETED
  FAILED
}

model Document {
  // ... existing fields
  metadata          Json?             // Stores extracted key-value pairs
  extractionStatus  ExtractionStatus  @default(PENDING)
  extractionError   String?
}
```

## 2. Dependencies

- Install Google Generative AI SDK.
  ```bash
  npm install @google/generative-ai
  ```

## 3. Environment Variables

- Add `GEMINI_API_KEY` to `.env`.

## 4. Feature Implementation: `features/documents`

### A. AI Service (`features/documents/services/ai.service.ts`)

Create a service to handle interactions with Gemini.

- **Function**: `extractDocumentMetadata(fileBuffer: Buffer, mimeType: string, docType: DocumentType): Promise<any>`
- **Logic**:
  - Initialize `GoogleGenerativeAI` with API key.
  - Select model (e.g., `gemini-1.5-flash` for speed and cost).
  - Construct a prompt based on `docType`.
    - Example for `FACTURE`: "Extract invoice date, total amount, currency, and vendor name as JSON."
  - Send image/PDF data inline.
  - Parse JSON response.

### B. Update Actions (`features/documents/actions.ts`)

Modify `uploadDocumentFile` to trigger extraction.

- After successful upload and DB creation:
  - Call `aiService.extractDocumentMetadata`.
  - Update the `Document` record with the result and set `extractionStatus` to `COMPLETED`.
  - Handle errors by setting `extractionStatus` to `FAILED`.
  - **Note**: This can be done asynchronously (fire and forget) to not block the UI, or awaited if we want immediate feedback. Given Next.js Server Actions, awaiting is safer for now, or we use a background job if it takes too long. Gemini Flash is fast, so awaiting might be acceptable.

## 5. UI Updates

- Display the extracted metadata in the document details view.
- Allow users to edit the extracted metadata if it's incorrect.

## 6. Step-by-Step Execution

1.  **Modify Schema**: Update `prisma/schema.prisma` and run `prisma migrate dev`.
2.  **Install Package**: `npm install @google/generative-ai`.
3.  **Create Service**: Implement `features/documents/services/ai.service.ts`.
4.  **Integrate**: Update `features/documents/actions.ts`.
5.  **Test**: Upload a document and verify metadata extraction.

## Example Prompts per Type

- **FACTURE**: `{"date": "YYYY-MM-DD", "amount": number, "currency": "EUR|USD", "vendor": string}`
- **CARTE_IDENTITE**: `{"nom": string, "prenom": string, "numero": string, "date_expiration": "YYYY-MM-DD"}`
