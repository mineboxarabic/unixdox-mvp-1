/**
 * Unit tests for FileNamingService
 * 
 * Run with: npx tsx shared/utils/file-naming.service.test.ts
 */

import { fileNamingService } from './file-naming.service';
import { DocumentType } from '@prisma/client';

// Simple test runner
function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (error) {
    console.error(`✗ ${name}`);
    console.error(error);
  }
}

function assertEquals(actual: any, expected: any, message?: string) {
  if (actual !== expected) {
    throw new Error(`${message || 'Assertion failed'}: expected ${expected}, got ${actual}`);
  }
}

function assertContains(str: string, substring: string, message?: string) {
  if (!str.includes(substring)) {
    throw new Error(`${message || 'Assertion failed'}: "${str}" does not contain "${substring}"`);
  }
}

console.log('\n🧪 Testing FileNamingService\n');

// Test 1: Extract file extension
test('getFileExtension - PDF file', () => {
  const ext = fileNamingService.getFileExtension('document.pdf');
  assertEquals(ext, 'pdf');
});

test('getFileExtension - JPG file', () => {
  const ext = fileNamingService.getFileExtension('photo.JPG');
  assertEquals(ext, 'jpg');
});

test('getFileExtension - No extension defaults to pdf', () => {
  const ext = fileNamingService.getFileExtension('document');
  assertEquals(ext, 'pdf');
});

// Test 2: Generate filename for identity document (CNI - no date, no numero)
test('generateFileName - Identity card with full metadata', () => {
  const fileName = fileNamingService.generateFileName({
    type: DocumentType.CARTE_IDENTITE,
    metadata: {
      nom: 'Dupont',
      prenom: 'Jean',
      numero: 'AB123456',
    },
  }, 'pdf');
  
  assertContains(fileName, 'CIN_', 'Should start with CIN prefix');
  assertContains(fileName, 'Dupont', 'Should contain last name');
  assertContains(fileName, 'Jean', 'Should contain first name');
  assertEquals(fileName.includes('AB123456'), false, 'Should NOT contain document number for CNI');
  assertEquals(fileName.includes('2025'), false, 'Should NOT contain date for CNI');
  assertContains(fileName, '.pdf', 'Should end with .pdf');
  // Expected format: CIN_Dupont_Jean.pdf
});

// Test 3: Generate filename for invoice
test('generateFileName - Invoice with vendor info', () => {
  const fileName = fileNamingService.generateFileName({
    type: DocumentType.FACTURE,
    metadata: {
      vendorName: 'EDF',
      invoiceNumber: 'INV-2024-001',
      date: '2024-01-15',
    },
  }, 'pdf');
  
  assertContains(fileName, 'FACTURE_', 'Should start with FACTURE prefix');
  assertContains(fileName, 'EDF', 'Should contain vendor name');
  assertContains(fileName, 'INV-2024-001', 'Should contain invoice number');
  assertContains(fileName, '.pdf', 'Should end with .pdf');
});

// Test 4: Generate filename for passport (should include date now)
test('generateFileName - Passport', () => {
  const fileName = fileNamingService.generateFileName({
    type: DocumentType.PASSEPORT,
    metadata: {
      nom: 'Martin',
      prenom: 'Sophie',
      numero: 'PA9876543',
    },
  }, 'jpg');
  
  assertContains(fileName, 'PASSEPORT_', 'Should start with PASSEPORT prefix');
  assertContains(fileName, 'Martin', 'Should contain last name');
  assertContains(fileName, 'Sophie', 'Should contain first name');
  // Should NOT contain numero for passport
  assertEquals(fileName.includes('PA9876543'), false, 'Should NOT contain numero');
  // Should include date
  const datePattern = /\d{4}-\d{2}-\d{2}/;
  assertEquals(datePattern.test(fileName), true, 'Should contain date for PASSEPORT');
  assertContains(fileName, '.jpg', 'Should end with .jpg');
  // Expected format: PASSEPORT_Martin_Sophie_2025-12-12.jpg
});

// Test 5: Generate filename for insurance
test('generateFileName - Insurance document', () => {
  const fileName = fileNamingService.generateFileName({
    type: DocumentType.ASSURANCE,
    metadata: {
      assureur: 'AXA',
      numeroPolice: 'POL123456',
      typeAssurance: 'Auto',
    },
  }, 'pdf');
  
  assertContains(fileName, 'ASSURANCE_', 'Should start with ASSURANCE prefix');
  assertContains(fileName, 'AXA', 'Should contain insurer name');
  assertContains(fileName, 'POL123456', 'Should contain policy number');
  assertContains(fileName, '.pdf', 'Should end with .pdf');
});

// Test 6: Generate filename for payslip
test('generateFileName - Payslip', () => {
  const fileName = fileNamingService.generateFileName({
    type: DocumentType.FICHE_PAIE,
    metadata: {
      employeur: 'TechCorp',
      periode: '2024-01',
    },
  }, 'pdf');
  
  assertContains(fileName, 'FICHE_PAIE_', 'Should start with FICHE_PAIE prefix');
  assertContains(fileName, 'TechCorp', 'Should contain employer name');
  assertContains(fileName, '2024-01', 'Should contain period');
  assertContains(fileName, '.pdf', 'Should end with .pdf');
});

// Test 6b: Generate filename for Carte Vitale (includes date and name, no numero)
test('generateFileName - Carte Vitale', () => {
  const fileName = fileNamingService.generateFileName({
    type: DocumentType.CARTE_VITALE,
    metadata: {
      nom: 'Dupont',
      prenom: 'Jean',
      numero: '1234567890123',
    },
  }, 'jpg');
  
  assertContains(fileName, 'CARTE_VITALE_', 'Should start with CARTE_VITALE prefix');
  assertContains(fileName, 'Dupont', 'Should contain last name');
  assertContains(fileName, 'Jean', 'Should contain first name');
  assertEquals(fileName.includes('1234567890123'), false, 'Should NOT contain numero for Carte Vitale');
  // Check for date pattern (YYYY-MM-DD)
  const datePattern = /\d{4}-\d{2}-\d{2}/;
  assertEquals(datePattern.test(fileName), true, 'Should contain date for Carte Vitale');
  assertContains(fileName, '.jpg', 'Should end with .jpg');
  // Expected format: CARTE_VITALE_Dupont_Jean_2025-12-12.jpg
});

// Test 7: Generate filename with tags when no specific metadata
test('generateFileName - Generic document with tags', () => {
  const fileName = fileNamingService.generateFileName({
    type: DocumentType.AUTRE,
    metadata: {},
    tags: ['Important', 'Personnel'],
  }, 'pdf');
  
  assertContains(fileName, 'DOC_', 'Should start with DOC prefix');
  assertContains(fileName, 'Important', 'Should use first tag when no metadata');
  assertContains(fileName, '.pdf', 'Should end with .pdf');
});

// Test 8: Sanitization - remove invalid characters
test('generateFileName - Sanitizes special characters', () => {
  const fileName = fileNamingService.generateFileName({
    type: DocumentType.FACTURE,
    metadata: {
      vendorName: 'Société/Test*Company',
      invoiceNumber: 'INV<>2024',
    },
  }, 'pdf');
  
  assertContains(fileName, 'FACTURE_', 'Should start with FACTURE prefix');
  // Special characters should be replaced with underscores
  console.log(`    Generated: ${fileName}`);
  assertEquals(fileName.includes('/'), false, 'Should not contain /');
  assertEquals(fileName.includes('*'), false, 'Should not contain *');
  assertEquals(fileName.includes('<'), false, 'Should not contain <');
  assertEquals(fileName.includes('>'), false, 'Should not contain >');
});

// Test 9: Date included for documents that require it
test('generateFileName - Includes date for applicable documents', () => {
  const fileName = fileNamingService.generateFileName({
    type: DocumentType.FACTURE,
    metadata: { vendorName: 'Test' },
  }, 'pdf');
  
  // Check if filename contains a date pattern (YYYY-MM-DD)
  const datePattern = /\d{4}-\d{2}-\d{2}/;
  assertEquals(datePattern.test(fileName), true, 'Should contain date pattern for FACTURE');
});

// Test 9b: Date NOT included for documents that don't require it
test('generateFileName - No date for CNI', () => {
  const fileName = fileNamingService.generateFileName({
    type: DocumentType.CARTE_IDENTITE,
    metadata: { nom: 'Test' },
  }, 'pdf');
  
  // Check that filename does NOT contain a date pattern (YYYY-MM-DD)
  const datePattern = /\d{4}-\d{2}-\d{2}/;
  assertEquals(datePattern.test(fileName), false, 'Should NOT contain date for CNI');
});

// Test 10: Default to DOC prefix when type is missing
test('generateFileName - Defaults to DOC when no type', () => {
  const fileName = fileNamingService.generateFileName({
    metadata: {},
  }, 'pdf');
  
  assertContains(fileName, 'DOC_', 'Should default to DOC prefix');
  assertContains(fileName, '.pdf', 'Should end with .pdf');
});

// Test 11: Append counter for duplicates
test('appendCounter - Adds counter to filename', () => {
  const result1 = fileNamingService.appendCounter('test.jpg', 2);
  assertEquals(result1, 'test_2.jpg');

  const result2 = fileNamingService.appendCounter('test.jpg', 3);
  assertEquals(result2, 'test_3.jpg');

  const result3 = fileNamingService.appendCounter('document.pdf', 10);
  assertEquals(result3, 'document_10.pdf');
});

// Test 12: Generate unique filename with no duplicates
test('generateUniqueFileName - No duplicates, returns base name', () => {
  const baseFileName = 'CIN_Dupont_Jean_2024-12-12.pdf';
  const existingFiles: string[] = [];
  
  const result = fileNamingService.generateUniqueFileName(baseFileName, existingFiles);
  assertEquals(result, baseFileName, 'Should return base name when no duplicates');
});

// Test 13: Generate unique filename with one duplicate
test('generateUniqueFileName - One duplicate exists', () => {
  const baseFileName = 'CIN_Dupont_Jean_2024-12-12.pdf';
  const existingFiles = ['CIN_Dupont_Jean_2024-12-12.pdf'];
  
  const result = fileNamingService.generateUniqueFileName(baseFileName, existingFiles);
  assertEquals(result, 'CIN_Dupont_Jean_2024-12-12_2.pdf', 'Should append _2');
});

// Test 14: Generate unique filename with multiple duplicates
test('generateUniqueFileName - Multiple duplicates exist', () => {
  const baseFileName = 'FACTURE_EDF_2024-12-12.pdf';
  const existingFiles = [
    'FACTURE_EDF_2024-12-12.pdf',
    'FACTURE_EDF_2024-12-12_2.pdf',
    'FACTURE_EDF_2024-12-12_3.pdf',
  ];
  
  const result = fileNamingService.generateUniqueFileName(baseFileName, existingFiles);
  assertEquals(result, 'FACTURE_EDF_2024-12-12_4.pdf', 'Should append _4');
});

// Test 15: Generate unique filename with gaps in sequence
test('generateUniqueFileName - Gaps in sequence', () => {
  const baseFileName = 'test.jpg';
  const existingFiles = [
    'test.jpg',
    'test_2.jpg',
    // Gap: test_3.jpg is missing
    'test_4.jpg',
  ];
  
  const result = fileNamingService.generateUniqueFileName(baseFileName, existingFiles);
  assertEquals(result, 'test_3.jpg', 'Should fill the gap at _3');
});

console.log('\n✨ All tests passed!\n');
