# Smart Document Matching Implementation Plan

## Goal Description
Implement an AI-powered feature to automatically match a user's available documents against the requirements of a "Demarche" (procedure) model. The system will identify missing documents and suggest valid replacements (e.g., using a Passport instead of an ID card) using Generative AI.

## User Review Required
> [!IMPORTANT]
> **AI Cost & Latency**: This feature involves sending a list of all user documents to the AI model for every check. We should ensure this scales well if a user has many documents.
> **Privacy**: Document metadata (types, tags) will be sent to the AI provider (Google Gemini). No file content is sent in this specific step, only metadata.

## Architecture & Usage Context
This feature enables two distinct workflows for the user when starting a demarche:

1.  **Manual Selection**: The user selects a procedure and sees a list of required documents. They manually browse their library and assign a document to each requirement.
2.  **Automatic Selection (Smart Matching)**: The user selects a procedure, and the system **automatically** scans their document library. It pre-fills the requirements with the best matching documents (or valid replacements like Passport for ID). The user simply reviews and confirms.

The `aiService.matchDocumentsToRequirements` function powers the **Automatic Selection** mode.

## Proposed Changes

### Backend - AI Service
#### [MODIFY] [ai.service.ts](file:///c:/Projects/unixdox-mvp-1/features/documents/services/ai.service.ts)
- Add `matchDocumentsToRequirements` method.
- **Input**: `requiredTypes: string[]`, `userDocuments: SimplifiedDocument[]`.
- **Data Privacy**: **ONLY** database metadata (type, tags, name, extracted metadata) will be sent to the AI. **NO** file content or buffers will be transmitted.
- **Output**: JSON object with `matches`, `missing`, and `replacements`.
- **Prompt Engineering**: Construct a prompt that explains the logic of document substitution (e.g., "Passport is a valid ID").

### Backend - Demarche Actions
#### [MODIFY] [actions.ts](file:///c:/Projects/unixdox-mvp-1/features/demarches/actions.ts)
- Add `checkDemarcheRequirementsAction(modeleId: string)`.
- This action will:
    1. Fetch the `ModeleDemarche` to get `typesDocumentsRequis`.
    2. Fetch all user documents using `documentService`.
    3. Call `aiService.matchDocumentsToRequirements`.
    4. Return the matching result.

### Frontend - UI (Future Work - Not in this plan's scope but context)
- The UI will call `checkDemarcheRequirementsAction` when a user selects a model.
- Display a "Requirements Check" summary showing which documents are ready and which are missing/replaced.

## Verification Plan

### Automated Tests
- Since I cannot run unit tests easily in this environment without setup, I will rely on manual verification via a script.

### Manual Verification
1.  **Create a Test Script**:
    -   Create `scripts/test-ai-matching.ts`.
    -   Mock a user with specific documents (e.g., only a Passport).
    -   Mock a requirement (e.g., "CARTE_IDENTITE").
    -   Call `aiService.matchDocumentsToRequirements` directly.
    -   Verify the AI suggests the Passport as a replacement.
2.  **Run the Script**:
    -   Execute the script using `npx tsx scripts/test-ai-matching.ts`.
    -   Check the console output for the expected JSON structure.
