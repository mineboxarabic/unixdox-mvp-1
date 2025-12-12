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

export class FileNamingService {
  // Constants for configuration
  private readonly MAX_FILENAME_LENGTH = 200;
  private readonly MEANINGFUL_METADATA_KEYS = ['name', 'title', 'subject', 'numero', 'reference'];

  /**
   * Generates a semantic file name based on document type and extracted metadata
   * Format: [DocumentType]_[RelevantInfo]_[Timestamp].[extension]
   */
  generateFileName(metadata: FileNamingMetadata, originalExtension: string): string {
    const timestamp = this.formatTimestamp(new Date());
    const typePrefix = this.getTypePrefix(metadata.type);
    const relevantInfo = this.extractRelevantInfo(metadata);
    
    // Combine parts and sanitize
    const nameParts = [typePrefix, relevantInfo, timestamp].filter(Boolean);
    const baseName = nameParts.join('_');
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

    switch (type) {
      case 'CARTE_IDENTITE':
      case 'PASSEPORT':
      case 'PERMIS_CONDUIRE':
        return this.formatIdentityInfo(docMetadata);

      case 'FACTURE':
        return this.formatInvoiceInfo(docMetadata);

      case 'CONTRAT':
        return this.formatContractInfo(docMetadata);

      case 'ASSURANCE':
        return this.formatInsuranceInfo(docMetadata);

      case 'FICHE_PAIE':
        return this.formatPayslipInfo(docMetadata);

      case 'JUSTIFICATIF_DOMICILE':
        return this.formatProofOfAddressInfo(docMetadata);

      default:
        return this.formatGenericInfo(docMetadata, metadata.tags);
    }
  }

  /**
   * Format identity document info (ID, Passport, Driver's License)
   */
  private formatIdentityInfo(metadata: Record<string, any>): string {
    const parts: string[] = [];
    
    if (metadata.nom) parts.push(metadata.nom);
    if (metadata.prenom) parts.push(metadata.prenom);
    if (metadata.numero) parts.push(metadata.numero);
    
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
   * Format timestamp for filename: YYYYMMDD_HHMMSS
   */
  private formatTimestamp(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}${month}${day}_${hours}${minutes}${seconds}`;
  }

  /**
   * Format date for filename: YYYYMMDD
   */
  private formatDate(dateStr: string): string {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return '';
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      return `${year}${month}${day}`;
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
}

export const fileNamingService = new FileNamingService();
