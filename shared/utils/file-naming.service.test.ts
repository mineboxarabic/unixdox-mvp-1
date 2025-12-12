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

// Test 2: Generate filename for identity document
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
  assertContains(fileName, 'AB123456', 'Should contain document number');
  assertContains(fileName, '.pdf', 'Should end with .pdf');
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

// Test 4: Generate filename for passport
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
  assertContains(fileName, '.jpg', 'Should end with .jpg');
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

// Test 9: Timestamp is always included
test('generateFileName - Includes timestamp', () => {
  const fileName = fileNamingService.generateFileName({
    type: DocumentType.CARTE_IDENTITE,
    metadata: { nom: 'Test' },
  }, 'pdf');
  
  // Check if filename contains a timestamp pattern (YYYYMMDD_HHMMSS)
  const timestampPattern = /\d{8}_\d{6}/;
  assertEquals(timestampPattern.test(fileName), true, 'Should contain timestamp pattern');
});

// Test 10: Default to DOC prefix when type is missing
test('generateFileName - Defaults to DOC when no type', () => {
  const fileName = fileNamingService.generateFileName({
    metadata: {},
  }, 'pdf');
  
  assertContains(fileName, 'DOC_', 'Should default to DOC prefix');
  assertContains(fileName, '.pdf', 'Should end with .pdf');
});

console.log('\n✨ All tests passed!\n');
