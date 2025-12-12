# Automatic File Renaming - Testing Guide

## Overview
This guide helps you test the automatic file renaming feature in a browser environment.

## Prerequisites

### Environment Setup
1. **Google OAuth Configuration**
   ```env
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   ```

2. **Database Configuration**
   - Ensure PostgreSQL is running
   - Run `npx prisma migrate dev`
   - Run `npx prisma generate`

3. **AI Service Configuration**
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   ```

## Testing Steps

### 1. Start the Application
```bash
npm install
npm run dev
```

Application will be available at `http://localhost:3000`

### 2. Login and Link Google Drive

1. Navigate to `http://localhost:3000`
2. Click "Se connecter avec Google"
3. Authorize the application
4. Grant Google Drive permissions

### 3. Test File Upload

#### Test Case 1: Identity Document
1. Go to Documents page
2. Click "Ajouter un document" or use the upload area
3. Upload a sample ID card/passport image (PDF or JPG)
4. Wait for processing to complete

**Expected Result:**
- File uploaded to Google Drive
- AI extracts name, document number, etc.
- File renamed in Drive: `CIN_LastName_FirstName_DocNumber_TIMESTAMP.pdf`
- Database updated with new filename

#### Test Case 2: Invoice
1. Upload a sample invoice (PDF)
2. Wait for processing

**Expected Result:**
- File renamed: `FACTURE_VendorName_InvoiceNumber_TIMESTAMP.pdf`

#### Test Case 3: Generic Document
1. Upload a generic document without specific metadata
2. Wait for processing

**Expected Result:**
- File renamed: `DOC_TagName_TIMESTAMP.pdf` (if tags available)
- Or: `DOC_TIMESTAMP.pdf` (if no metadata)

### 4. Verify in Google Drive

1. Open your Google Drive
2. Navigate to "Unidox" folder
3. Verify files have intelligent names

### 5. Verify in Database

Check the database:
```sql
SELECT id, "nomFichier", type, "extractionStatus", metadata 
FROM "Document" 
ORDER BY "dateCreation" DESC 
LIMIT 10;
```

**Expected Data:**
- `nomFichier` should show the intelligent name
- `extractionStatus` should be "COMPLETED"
- `metadata` should contain extracted information

## Test Scenarios

### Scenario 1: Happy Path - Identity Card

**Input:**
- Upload: French ID card image
- File name: `IMG_20241212.jpg`

**Expected Output:**
- Google Drive file: `CIN_Dupont_Jean_AB123456_2024-12-12.jpg`
- Database: Same filename stored in `nomFichier`
- Metadata extracted: name, document number, birth date

### Scenario 2: Invoice with Full Metadata

**Input:**
- Upload: EDF electricity bill
- File name: `facture.pdf`

**Expected Output:**
- Google Drive file: `FACTURE_EDF_INV2024001_2024-12-12.pdf`
- Metadata: vendor name, amount, date, invoice number

### Scenario 3: Special Characters in Metadata

**Input:**
- Upload: Document with special characters in metadata
- Metadata contains: `Société/Test*Company`

**Expected Output:**
- Special characters sanitized to underscores
- File: `FACTURE_Société_Test_Company_2024-12-12.pdf`

### Scenario 4: Rename Failure (Non-Critical)

**Simulate:**
- Revoke Google Drive permissions mid-upload
- Or disconnect network after upload but before rename

**Expected Output:**
- Upload succeeds
- Original filename kept
- Error logged as non-critical
- Document still accessible

### Scenario 5: Multiple Document Types

**Input:**
- Upload 5 different document types sequentially:
  1. ID Card
  2. Invoice
  3. Passport
  4. Insurance
  5. Payslip

**Expected Output:**
- Each file renamed with appropriate prefix and metadata
- All files in correct folder
- No naming conflicts (dates ensure uniqueness)

### Scenario 6: Duplicate Filename Handling

**Input:**
- Upload the same document type with same metadata twice

**Expected Output:**
- First upload: `CIN_Dupont_Jean_AB123456_2024-12-12.pdf`
- Second upload: `CIN_Dupont_Jean_AB123456_2024-12-12_2.pdf`
- Third upload: `CIN_Dupont_Jean_AB123456_2024-12-12_3.pdf`
- Counters increment automatically (Windows-style)

## Debugging

### Check Console Logs

Server logs should show:
```
Starting AI extraction for file: IMG_20241212.jpg
AI Extraction Result: { type: 'CARTE_IDENTITE', ... }
Renaming file from IMG_20241212.jpg to CIN_Dupont_Jean_AB123456_2024-12-12.jpg
File renamed successfully to: CIN_Dupont_Jean_AB123456_2024-12-12.jpg
```

For duplicate files:
```
Checking for existing filenames...
Found duplicate, appending counter...
Renaming file from IMG_20241212.jpg to CIN_Dupont_Jean_AB123456_2024-12-12_2.jpg
File renamed successfully to: CIN_Dupont_Jean_AB123456_2024-12-12_2.jpg
```

### Common Issues

1. **"Compte Google Drive non lié"**
   - Solution: Re-authenticate with Google
   - Ensure Google Drive scope is granted

2. **AI Extraction Failed**
   - Check GEMINI_API_KEY is valid
   - Verify image quality is good
   - File will keep original name

3. **Rename Failed (Non-Critical)**
   - Check Google Drive permissions
   - Upload still succeeds with original name
   - Check server logs for details

## Performance Benchmarks

Expected processing times:
- File upload to Drive: 1-3 seconds
- AI metadata extraction: 3-10 seconds
- File rename: 1-2 seconds
- **Total**: 5-15 seconds per file

## Browser Console

Check for errors in browser console:
1. Open Developer Tools (F12)
2. Navigate to Console tab
3. Look for any error messages during upload

## Unit Tests

Before manual testing, ensure unit tests pass:
```bash
npx tsx shared/utils/file-naming.service.test.ts
```

All 10 tests should pass ✅

## Success Criteria

✅ Files upload successfully
✅ AI extracts metadata correctly
✅ Files renamed with intelligent names in Google Drive
✅ Database stores new filenames
✅ Original upload URL updated
✅ No errors in console or server logs
✅ User experience is smooth (processing indicator shown)

## Notes

- The rename happens asynchronously after upload
- Users see a processing indicator during AI extraction
- If rename fails, upload still succeeds (non-critical error)
- Timestamps ensure filename uniqueness
- Special characters are automatically sanitized

## Support

If you encounter issues:
1. Check server logs for detailed error messages
2. Verify environment variables are set correctly
3. Ensure Google OAuth is properly configured
4. Check database connection
5. Verify GEMINI_API_KEY is valid

## Next Steps After Testing

Once manual testing is successful:
1. Document any edge cases discovered
2. Consider adding integration tests
3. Monitor performance in production
4. Gather user feedback on filename formats
5. Consider adding user preferences for naming patterns
