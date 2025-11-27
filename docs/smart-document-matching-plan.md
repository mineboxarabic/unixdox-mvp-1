# Smart Document Matching Implementation Plan

## Goal Description
Implement an AI-powered feature to automatically match a user's available documents against the requirements of a "Demarche" (procedure) model. The system will identify missing documents and suggest valid replacements (e.g., using a Passport instead of an ID card) using Generative AI.

## User Review Required
> [!IMPORTANT]
> **AI Cost & Latency**: This feature involves sending a list of all user documents to the AI model for every check. We should ensure this scales well if a user has many documents.
> **Privacy**: Document metadata (types, tags) will be sent to the AI provider (Google Gemini). No file content is sent in this specific step, only metadata.

## Architecture & Usage Context
This feature implements a **Unified Smart Selection Workflow**:

1.  **Step 1: Exact Match**: When a user selects a procedure, the system first attempts to automatically match requirements to documents in the vault based on exact `DocumentType`.
2.  **Step 2: AI Fallback**: For any requirements that remain **unmatched** (missing), the system calls the AI service. The AI analyzes the user's remaining documents to suggest valid replacements (e.g., "Passport" for "ID Card").
3.  **Step 3: User Review**: The user is presented with a pre-filled form.
    *   **Matched**: Shows the document (Exact or AI-suggested).
    *   **Missing**: Shows as empty/upload field.
    *   The user can manually override any selection or upload new files before confirming.

## Proposed Changes

### Backend - AI Service
#### [MODIFY] [ai.service.ts](file:///c:/Projects/unixdox-mvp-1/features/documents/services/ai.service.ts)
- Add `matchDocumentsToRequirements` method.
- **Input**: `requiredTypes: string[]`, `userDocuments: SimplifiedDocument[]`.
- **Logic**:
    1.  Perform exact matching on `DocumentType` first.
    2.  Identify missing requirements.
    3.  Call AI **only** for the missing requirements to find replacements among the remaining documents.
- **Data Privacy**: **ONLY** database metadata (type, tags, name, extracted metadata) will be sent to the AI.
- **Output**: JSON object with `matches` (Record<Requirement, DocID>), `missing` (string[]), and `replacements` (details on AI choices).

### Database Schema Updates
#### [MODIFY] [schema.prisma](file:///c:/Projects/unixdox-mvp-1/prisma/schema.prisma)
- Add `documentsAssocies` field to `DemarcheUtilisateur` model.
- **Type**: `Json`.
- **Interface**:
  ```typescript
  // In features/demarches/types/schemas.ts
  export interface DemarcheDocuments {
    [requirementName: string]: string; // Maps Requirement Name -> Document ID
  }
  ```

### Page Orchestration (Fixing Feature Isolation)
#### [MODIFY] [page.tsx](file:///c:/Projects/unixdox-mvp-1/app/demarches/create/page.tsx) (or relevant page)
- The **Page** (Server Component) orchestrates the "Fill-then-Create" strategy.
- **Logic**:
    1.  Fetch `ModeleDemarche` & User `Documents`.
    2.  Call `aiService.matchDocumentsToRequirements`.
    3.  Pass the result to the UI.

### Frontend - UI Components
#### [CREATE] `features/demarches/ui/DemarcheDocumentSelector.tsx`
- A component to display the list of requirements.
- **Props**: `requirements: string[]`, `initialMatches: DemarcheDocuments`, `userDocuments: Document[]`.
- **State**: Manages the current selection of documents.
- **Render**:
    -   For each requirement, show a dropdown/selector.
    -   Pre-select the value from `initialMatches`.
    -   If missing, show "Select a document" placeholder.
    -   Allow user to change selection.

### Backend - Demarche Actions
#### [MODIFY] [actions.ts](file:///c:/Projects/unixdox-mvp-1/features/demarches/actions.ts)
- Update `startNewDemarcheAction` to accept `documents: DemarcheDocuments`.
- Validate that at least some documents are provided (or allow partial save based on business rule).
- Save to `documentsAssocies`.

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
