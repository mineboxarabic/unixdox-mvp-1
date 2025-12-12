import { DocumentType } from '@prisma/client';

/**
 * Service for generating intelligent file names based on document metadata
 * Follows SOLID principles - Single Responsibility: Only handles file naming logic
 */
export interface FileNamingMetadata {
  type?: DocumentType;
  metadata?: Record<string, any>;
  originalFileName?: string;
  dateExpiration?: Date;
  tags?: string[];
}

/**
 * Configuration for document-specific naming rules
 */
interface DocumentNamingRule {
  /** Whether to include the date in the filename */
  includeDate: boolean;
  /** Custom formatter for extracting info from metadata */
  formatInfo: (metadata: Record<string, any>) => string;
}

export class FileNamingService {
  // Constants for configuration
  private readonly MAX_FILENAME_LENGTH = 200;
  private readonly MEANINGFUL_METADATA_KEYS = ['name', 'title', 'subject', 'numero', 'reference'];

  /**
   * Document-specific naming rules
   * Easy to extend: just add new document types with their rules
   */
  private readonly DOCUMENT_RULES: Partial<Record<DocumentType, DocumentNamingRule>> = {
    // Identity documents - no date, just name (no numero for CNI)
    CARTE_IDENTITE: {
      includeDate: false,
      formatInfo: (metadata) => this.formatNameOnlyInfo(metadata),
    },
    // Carte Vitale - includes date and name only (no numero)
    CARTE_VITALE: {
      includeDate: true,
      formatInfo: (metadata) => this.formatNameOnlyInfo(metadata),
    },
    // Passport - no date, just name
    PASSEPORT: {
      includeDate: false,
      formatInfo: (metadata) => this.formatIdentityInfo(metadata),
    },
    // Driver's License - no date, just name
    PERMIS_CONDUIRE: {
      includeDate: false,
      formatInfo: (metadata) => this.formatIdentityInfo(metadata),
    },
    // Invoices - include date
    FACTURE: {
      includeDate: true,
      formatInfo: (metadata) => this.formatInvoiceInfo(metadata),
    },
    // Contracts - include date
    CONTRAT: {
      includeDate: true,
      formatInfo: (metadata) => this.formatContractInfo(metadata),
    },
    // Insurance - include date
    ASSURANCE: {
      includeDate: true,
      formatInfo: (metadata) => this.formatInsuranceInfo(metadata),
    },
    // Payslips - include date
    FICHE_PAIE: {
      includeDate: true,
      formatInfo: (metadata) => this.formatPayslipInfo(metadata),
    },
    // Proof of address - include date
    JUSTIFICATIF_DOMICILE: {
      includeDate: true,
      formatInfo: (metadata) => this.formatProofOfAddressInfo(metadata),
    },
  };

  /**
   * Generates a semantic file name based on document type and extracted metadata
   * Format: [DocumentType]_[RelevantInfo]_[Date].[extension] (date optional based on document type)
   * Date format: YYYY-MM-DD
   */
  generateFileName(metadata: FileNamingMetadata, originalExtension: string): string {
    const typePrefix = this.getTypePrefix(metadata.type);
    const relevantInfo = this.extractRelevantInfo(metadata);
    
    // Check if this document type should include a date
    const rule = metadata.type ? this.DOCUMENT_RULES[metadata.type] : undefined;
    const includeDate = rule?.includeDate ?? true; // Default to including date
    
    // Build filename parts
    const nameParts = [typePrefix, relevantInfo];
    if (includeDate) {
      const timestamp = this.formatTimestamp(new Date());
      nameParts.push(timestamp);
    }
    
    // Combine parts and sanitize
    const baseName = nameParts.filter(Boolean).join('_');
    const sanitizedName = this.sanitizeFileName(baseName);
    
    return `${sanitizedName}.${originalExtension}`;
  }

  /**
   * Extracts relevant information from metadata based on document type
   */
  private extractRelevantInfo(metadata: FileNamingMetadata): string {
    // If no metadata, try using tags
    if (!metadata.metadata || Object.keys(metadata.metadata).length === 0) {
      if (metadata.tags && metadata.tags.length > 0) {
        return metadata.tags[0];
      }
      return '';
    }

    const docMetadata = metadata.metadata;
    const type = metadata.type;

    // Use document-specific rule if available
    if (type && this.DOCUMENT_RULES[type]) {
      return this.DOCUMENT_RULES[type]!.formatInfo(docMetadata);
    }

    // Fallback to generic formatting
    return this.formatGenericInfo(docMetadata, metadata.tags);
  }

  /**
   * Format identity document info (ID, Passport, Driver's License)
   * Includes document number
   */
  private formatIdentityInfo(metadata: Record<string, any>): string {
    const parts: string[] = [];
    
    if (metadata.nom) parts.push(metadata.nom);
    if (metadata.prenom) parts.push(metadata.prenom);
    if (metadata.numero) parts.push(metadata.numero);
    
    return parts.join('_');
  }

  /**
   * Format name-only info (for documents like CARTE_VITALE)
   * Only includes nom and prenom, no document number
   */
  private formatNameOnlyInfo(metadata: Record<string, any>): string {
    const parts: string[] = [];
    
    if (metadata.nom) parts.push(metadata.nom);
    if (metadata.prenom) parts.push(metadata.prenom);
    
    return parts.join('_');
  }

  /**
   * Format invoice info
   */
  private formatInvoiceInfo(metadata: Record<string, any>): string {
    const parts: string[] = [];
    
    if (metadata.vendorName) parts.push(metadata.vendorName);
    if (metadata.invoiceNumber) parts.push(metadata.invoiceNumber);
    if (metadata.date) parts.push(this.formatDate(metadata.date));
    
    return parts.join('_');
  }

  /**
   * Format contract info
   */
  private formatContractInfo(metadata: Record<string, any>): string {
    const parts: string[] = [];
    
    if (metadata.parties && Array.isArray(metadata.parties)) {
      parts.push(metadata.parties[0]); // First party
    }
    if (metadata.dateSignature) parts.push(this.formatDate(metadata.dateSignature));
    
    return parts.join('_');
  }

  /**
   * Format insurance info
   */
  private formatInsuranceInfo(metadata: Record<string, any>): string {
    const parts: string[] = [];
    
    if (metadata.assureur) parts.push(metadata.assureur);
    if (metadata.numeroPolice) parts.push(metadata.numeroPolice);
    if (metadata.typeAssurance) parts.push(metadata.typeAssurance);
    
    return parts.join('_');
  }

  /**
   * Format payslip info
   */
  private formatPayslipInfo(metadata: Record<string, any>): string {
    const parts: string[] = [];
    
    if (metadata.employeur) parts.push(metadata.employeur);
    if (metadata.periode) parts.push(metadata.periode);
    
    return parts.join('_');
  }

  /**
   * Format proof of address info
   */
  private formatProofOfAddressInfo(metadata: Record<string, any>): string {
    const parts: string[] = [];
    
    if (metadata.vendorName) parts.push(metadata.vendorName);
    if (metadata.type) parts.push(metadata.type);
    if (metadata.date) parts.push(this.formatDate(metadata.date));
    
    return parts.join('_');
  }

  /**
   * Format generic document info using available metadata or tags
   */
  private formatGenericInfo(metadata: Record<string, any>, tags?: string[]): string {
    // Try to use first meaningful tag
    if (tags && tags.length > 0) {
      return tags[0];
    }
    
    // Or use first meaningful metadata value
    for (const key of this.MEANINGFUL_METADATA_KEYS) {
      if (metadata[key]) {
        return String(metadata[key]);
      }
    }
    
    return '';
  }

  /**
   * Get a short prefix for the document type
   */
  private getTypePrefix(type?: DocumentType): string {
    if (!type) return 'DOC';

    const prefixMap: Record<DocumentType, string> = {
      CARTE_IDENTITE: 'CIN',
      PASSEPORT: 'PASSEPORT',
      PERMIS_CONDUIRE: 'PERMIS',
      ACTE_NAISSANCE: 'ACTE_NAISSANCE',
      ACTE_MARIAGE: 'ACTE_MARIAGE',
      FACTURE: 'FACTURE',
      CONTRAT: 'CONTRAT',
      ASSURANCE: 'ASSURANCE',
      FICHE_PAIE: 'FICHE_PAIE',
      JUSTIFICATIF_DOMICILE: 'JUSTIF_DOM',
      DIPLOME: 'DIPLOME',
      ATTESTATION_TRAVAIL: 'ATTESTATION_TRAVAIL',
      RELEVE_BANCAIRE: 'RELEVE_BANCAIRE',
      CARTE_VITALE: 'CARTE_VITALE',
      AUTRE: 'DOC',
    };

    return prefixMap[type] || 'DOC';
  }

  /**
   * Format timestamp for filename: YYYY-MM-DD
   */
  private formatTimestamp(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

  /**
   * Format date for filename: YYYY-MM-DD
   */
  private formatDate(dateStr: string): string {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return '';
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      return `${year}-${month}-${day}`;
    } catch {
      return '';
    }
  }

  /**
   * Sanitize filename by removing invalid characters and limiting length
   */
  private sanitizeFileName(fileName: string): string {
    // Replace invalid characters with underscore
    let sanitized = fileName
      .replace(/[<>:"/\\|?*\x00-\x1F]/g, '_')
      .replace(/\s+/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '');
    
    // Limit length to MAX_FILENAME_LENGTH
    if (sanitized.length > this.MAX_FILENAME_LENGTH) {
      sanitized = sanitized.substring(0, this.MAX_FILENAME_LENGTH);
    }
    
    return sanitized || 'document';
  }

  /**
   * Extract file extension from original filename
   */
  getFileExtension(fileName: string): string {
    const lastDot = fileName.lastIndexOf('.');
    if (lastDot === -1 || lastDot === fileName.length - 1) {
      return 'pdf'; // Default to pdf if no extension
    }
    return fileName.substring(lastDot + 1).toLowerCase();
  }

  /**
   * Append a counter to filename for handling duplicates (Windows-style)
   * Examples:
   * - test.jpg → test_2.jpg
   * - test.jpg → test_3.jpg
   */
  appendCounter(fileName: string, counter: number): string {
    const lastDot = fileName.lastIndexOf('.');
    if (lastDot === -1) {
      return `${fileName}_${counter}`;
    }
    const baseName = fileName.substring(0, lastDot);
    const extension = fileName.substring(lastDot);
    return `${baseName}_${counter}${extension}`;
  }

  /**
   * Generate unique filename by checking against existing filenames
   * If the base filename exists, appends _2, _3, etc.
   */
  generateUniqueFileName(
    baseFileName: string,
    existingFileNames: string[]
  ): string {
    // If no conflict, return the base name
    if (!existingFileNames.includes(baseFileName)) {
      return baseFileName;
    }

    // Find the next available counter
    let counter = 2;
    let candidateName = this.appendCounter(baseFileName, counter);
    
    while (existingFileNames.includes(candidateName)) {
      counter++;
      candidateName = this.appendCounter(baseFileName, counter);
    }

    return candidateName;
  }
}

export const fileNamingService = new FileNamingService();
