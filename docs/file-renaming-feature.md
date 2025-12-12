# Automatic File Renaming Feature

## Overview
This document describes the automatic file renaming feature that intelligently renames uploaded documents based on AI-extracted metadata.

## How It Works

### 1. File Upload Flow
```
User uploads file → Google Drive storage → AI extraction → Intelligent rename → Database update
```

### 2. Components

#### **FileNamingService** (`shared/utils/file-naming.service.ts`)
A modular, reusable service following SOLID principles (Single Responsibility).

**Key Methods:**
- `generateFileName(metadata, extension)`: Generates semantic filename based on document type and metadata
- `getFileExtension(fileName)`: Extracts file extension from original filename

**Filename Format:**
```
[DocumentType]_[Name]_[Date].[extension]
```
*General rule: All documents include date*
*Exception: CNI (CARTE_IDENTITE) has no date*

**Examples:**
- Identity Card (CNI): `CIN_Yassin_YOUNES.pdf` *(EXCEPTION: no date)*
- Carte Vitale: `CARTE_VITALE_Yassin_YOUNES_2024-12-12.jpg` *(with date)*
- Passport: `PASSEPORT_Martin_Sophie_2024-12-12.jpg` *(with date)*
- Invoice: `FACTURE_EDF_INV2024001_2024-12-12.pdf` *(with date)*
- Insurance: `ASSURANCE_AXA_POL123456_Auto_2024-12-12.pdf` *(with date)*
- Payslip: `FICHE_PAIE_TechCorp_2024-01_2024-12-12.pdf` *(with date)*

#### **StorageService** (`features/documents/services/storage.service.ts`)
Extended with `renameFile()` method to rename files in Google Drive.

**New Method:**
- `renameFile(auth, fileId, newName)`: Renames a file in Google Drive and returns updated metadata

#### **Upload Action** (`features/documents/actions.ts`)
Modified to automatically rename files after AI extraction completes.

**Process:**
1. Upload file to Google Drive with original name
2. Save initial document record in database
3. AI extracts metadata (type, tags, expiration date, etc.)
4. Generate intelligent filename using FileNamingService
5. Rename file in Google Drive
6. Update database with new filename and URL

### 3. Document Type Handling

The service uses a **scalable, configuration-based approach** with a **general rule**:

**General Rule:** `DOCUMENTTYPE_NAME_DATE` for all documents
**Exception:** CNI (CARTE_IDENTITE) uses `DOCUMENTTYPE_NAME` (no date)

| Document Type | Extracted Information | Include Date? |
|--------------|----------------------|---------------|
| CARTE_IDENTITE (CNI) | Last name, first name only | ❌ No (EXCEPTION) |
| CARTE_VITALE | Last name, first name only | ✅ Yes |
| PASSEPORT | Last name, first name only | ✅ Yes |
| PERMIS_CONDUIRE | Last name, first name only | ✅ Yes |
| FACTURE | Vendor name, invoice number, date | ✅ Yes |
| CONTRAT | Parties, signature date | ✅ Yes |
| ASSURANCE | Insurer, policy number, insurance type | ✅ Yes |
| FICHE_PAIE | Employer, period | ✅ Yes |
| JUSTIFICATIF_DOMICILE | Vendor name, type, date | ✅ Yes |
| AUTRE (Generic) | First tag or first meaningful metadata value | ✅ Yes |

**Adding New Document Types:**
Simply add a new entry to the `DOCUMENT_RULES` configuration in `FileNamingService`:
```typescript
DOCUMENT_RULES = {
  NEW_DOCUMENT_TYPE: {
    includeDate: true,  // or false
    formatInfo: (metadata) => this.formatCustomInfo(metadata),
  },
}
```

### 4. Safety Features

- **Non-blocking**: If renaming fails, the upload still succeeds with the original filename
- **Sanitization**: Removes invalid characters (`< > : " / \ | ? *`) and limits filename length
- **Date-based uniqueness**: Includes date in filename for organization
- **Duplicate handling**: Automatically appends counters (_2, _3, etc.) for duplicate filenames, similar to Windows
- **Fallback**: Uses tags or generic info when specific metadata is unavailable

### 5. Duplicate Filename Handling

When a file with the same name already exists for the user, the system automatically appends a counter:

**Example:**
```
First upload:  CIN_Dupont_Jean.pdf
Second upload: CIN_Dupont_Jean_2.pdf
Third upload:  CIN_Dupont_Jean_3.pdf
```

This Windows-style approach ensures:
- No file overwrites
- Clear versioning of duplicate documents
- User-friendly filename patterns

## Architecture Principles

### DRY (Don't Repeat Yourself)
- File naming logic centralized in a single service
- Reusable across the application
- Metadata formatting extracted into separate methods

### SOLID Principles
- **Single Responsibility**: FileNamingService only handles filename generation
- **Open/Closed**: Easy to extend with new document types without modifying existing code
  - Configuration-based approach using `DOCUMENT_RULES`
  - Add new document types by simply adding configuration entries
  - No need to modify core logic or switch statements
- **Dependency Inversion**: Services depend on interfaces, not concrete implementations

### Scalability & Extensibility

The service is designed for easy extension:

**1. Configuration-Based Rules:**
Each document type has its own rule configuration:
```typescript
interface DocumentNamingRule {
  includeDate: boolean;           // Whether to include date
  formatInfo: (metadata) => string; // Custom formatter
}
```

**2. Easy to Add New Documents:**
```typescript
// Example: Adding a new document type (follows general rule by default)
DIPLOME: {
  includeDate: true,  // General rule: include date (unless exception like CNI)
  formatInfo: (metadata) => {
    // Extract school name and degree
    const parts = [];
    if (metadata.school) parts.push(metadata.school);
    if (metadata.degree) parts.push(metadata.degree);
    return parts.join('_');
  },
}
```

**3. Easy to Add Exceptions:**
General rule: All documents use `DOCUMENTTYPE_NAME_DATE`
Exception: Only CNI uses `DOCUMENTTYPE_NAME` (no date)
- CNI: No date → `CIN_Yassin_YOUNES.pdf`
- CARTE_VITALE: With date → `CARTE_VITALE_Yassin_YOUNES_2024-12-12.jpg`
- PASSEPORT: With date → `PASSEPORT_Martin_Sophie_2024-12-12.jpg`

### Feature Folder Structure
- FileNamingService placed in `shared/utils` (can be used by any feature)
- Document-specific logic remains in `features/documents`
- No cross-feature imports (follows project guidelines)

## Testing

### Unit Tests
Run the unit tests:
```bash
npx tsx shared/utils/file-naming.service.test.ts
```

Tests cover:
- File extension extraction
- Filename generation for all document types
- Special character sanitization
- Timestamp inclusion
- Tag fallback behavior
- Duplicate filename handling (Windows-style counters)
- Counter appending logic
- Unique filename generation

### Manual Testing

Since the feature requires Google OAuth authentication, manual testing should be performed:

1. **Setup**:
   - Ensure Google OAuth is configured
   - Have a test Google account linked

2. **Test Cases**:
   - Upload various document types (ID card, invoice, passport, etc.)
   - Verify files are renamed in Google Drive with intelligent names
   - Check database records have updated filenames
   - Upload duplicate documents to verify counter appending (_2, _3, etc.)
   - Confirm original functionality (AI extraction) still works
   - Test edge cases (no metadata, special characters in metadata)

3. **Expected Results**:
   - Files in Google Drive should have semantic names
   - Database `nomFichier` field should match the renamed file
   - `urlStockage` should be updated with new Google Drive link
   - AI extraction status should be `COMPLETED`

## Error Handling

- **AI Extraction Fails**: File keeps original name, extraction status set to `FAILED`
- **Rename Fails**: File keeps original name, upload succeeds (logged as non-critical)
- **Invalid Characters**: Automatically sanitized to underscores
- **No Metadata**: Falls back to tags, then generic "document" name

## Performance Considerations

- Rename operation happens after upload (non-blocking for user)
- Single API call to Google Drive for rename
- Minimal database updates (only filename and URL)
- No impact on AI extraction performance

## Future Enhancements

Potential improvements:
1. User preference for filename format
2. Custom naming templates per document type
3. Batch rename for existing documents
4. Preview generated filename before upload
5. Support for multilingual filename generation

## Code Quality

- ✅ TypeScript strict mode compliance
- ✅ Comprehensive unit tests
- ✅ Detailed code comments
- ✅ Error handling at all levels
- ✅ Modular and reusable design
- ✅ Follows project coding standards
