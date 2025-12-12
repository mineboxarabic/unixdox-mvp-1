/**
 * Echeances Feature Types
 * Defines types for document deadline tracking
 */

import type { Document, DocumentType } from '@prisma/client';

/**
 * Status of a deadline based on days until expiration
 */
export enum EcheanceStatut {
    /** Document has already expired */
    EXPIRE = 'EXPIRE',
    /** Less than 7 days until expiration */
    URGENT = 'URGENT',
    /** Less than 30 days until expiration */
    PROCHE = 'PROCHE',
    /** More than 30 days until expiration */
    A_VENIR = 'A_VENIR',
}

/**
 * Echeance represents a document with an expiration date
 */
export interface Echeance {
    /** Document ID */
    id: string;
    /** Document filename */
    nomFichier: string;
    /** Document type */
    type: DocumentType;
    /** Expiration date */
    dateExpiration: Date;
    /** Days until expiration (negative if expired) */
    joursRestants: number;
    /** Calculated status based on days remaining */
    statut: EcheanceStatut;
    /** Original document upload date */
    dateUpload: Date;
}

/**
 * Filter options for echeances list
 */
export interface EcheancesFilters {
    /** Filter by status */
    statut?: EcheanceStatut;
    /** Filter by document type */
    type?: DocumentType;
    /** Search query for filename */
    search?: string;
}
