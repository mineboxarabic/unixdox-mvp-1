'use client';

import { useState, useEffect, useMemo } from 'react';
import { createListCollection } from '@chakra-ui/react';
import { 
  DialogRoot, 
  DialogContent, 
  DialogCloseTrigger 
} from '@/shared/components/ui/dialog';
import { toaster } from '@/shared/components/ui/toaster';
import { useRouter } from 'next/navigation';
import type { ModeleDemarche, Document } from '@prisma/client';
import type { DemarcheDocuments } from '../types/schemas';

import { updateDemarcheTitleAction } from '../actions';

// Import step components
import { SearchStep, ReviewStep, LoadingStep, SuccessStep } from './components/dialog';

// Step types
type DialogStep = 'search' | 'review' | 'loading' | 'success';

interface MatchedDocument {
  requirement: string;
  document: Document | null;
  isReplacement: boolean;
  replacementReason?: string;
}

interface CreateDemarcheDialogProps {
  isOpen: boolean;
  onClose: () => void;
  modeles: ModeleDemarche[];
  userDocuments: Document[];
  onMatchDocuments: (modeleId: string) => Promise<{
    matches: DemarcheDocuments;
    missing: string[];
    replacements: Record<string, { docId: string; reason: string }>;
  }>;
  onCreateDemarche: (
    modeleId: string,
    documents: DemarcheDocuments,
    name?: string
  ) => Promise<{ success: boolean; demarcheId?: string }>;
}

export function CreateDemarcheDialog({
  isOpen,
  onClose,
  modeles,
  userDocuments,
  onMatchDocuments,
  onCreateDemarche,
}: CreateDemarcheDialogProps) {
  const router = useRouter();
  const [step, setStep] = useState<DialogStep>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModele, setSelectedModele] = useState<ModeleDemarche | null>(null);
  const [matchedDocuments, setMatchedDocuments] = useState<MatchedDocument[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<DemarcheDocuments>({});
  const [createdDemarcheId, setCreatedDemarcheId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Create list collection for documents dropdown
  const documentsCollection = useMemo(() => 
    createListCollection({
      items: userDocuments.map((doc) => ({
        label: doc.nomFichier,
        value: doc.id,
        type: doc.type,
      })),
    }),
    [userDocuments]
  );

  // Reset state when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setStep('search');
      setSearchQuery('');
      setSelectedModele(null);
      setMatchedDocuments([]);
      setSelectedDocuments({});
      setCreatedDemarcheId(null);
      setIsLoading(false);
    }
  }, [isOpen]);

  // Filter modeles based on search query
  const filteredModeles = modeles.filter((modele) =>
    modele.titre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle modele selection and move to review step
  const handleSelectModele = async (modele: ModeleDemarche) => {
    setSelectedModele(modele);
    setIsLoading(true);
    
    try {
      const result = await onMatchDocuments(modele.id);
      
      // Build matched documents list
      const matched: MatchedDocument[] = modele.typesDocumentsRequis.map((req) => {
        const docId = result.matches[req];
        const doc = docId ? userDocuments.find((d) => d.id === docId) || null : null;
        const isReplacement = !!result.replacements[req];
        const replacementReason = result.replacements[req]?.reason;
        
        return {
          requirement: req,
          document: doc,
          isReplacement,
          replacementReason,
        };
      });
      
      setMatchedDocuments(matched);
      setSelectedDocuments(result.matches);
      
      const matchedCount = Object.keys(result.matches).length;
      const replacementCount = Object.keys(result.replacements).length;
      
      if (matchedCount > 0) {
        toaster.create({
          title: "Documents pré-remplis",
          description: `${matchedCount} documents trouvés automatiquement${replacementCount > 0 ? ` dont ${replacementCount} suggestions IA` : ''}.`,
          type: "success",
        });
      } else {
         toaster.create({
          title: "Aucun document trouvé",
          description: "Veuillez sélectionner vos documents manuellement.",
          type: "info",
        });
      }

      setStep('review');
    } catch (error) {
      console.error('Error matching documents:', error);
      toaster.create({
        title: "Erreur",
        description: "Une erreur est survenue lors de la recherche de documents.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Remove a document from the selection
  const handleRemoveDocument = (requirement: string) => {
    setSelectedDocuments((prev) => {
      const updated = { ...prev };
      delete updated[requirement];
      return updated;
    });
    setMatchedDocuments((prev) =>
      prev.map((m) =>
        m.requirement === requirement ? { ...m, document: null, isReplacement: false } : m
      )
    );
  };

  // Change document selection for a requirement
  const handleChangeDocument = (requirement: string, docId: string) => {
    const doc = userDocuments.find((d) => d.id === docId) || null;
    
    setSelectedDocuments((prev) => ({
      ...prev,
      [requirement]: docId,
    }));
    
    setMatchedDocuments((prev) =>
      prev.map((m) =>
        m.requirement === requirement
          ? { ...m, document: doc, isReplacement: false, replacementReason: undefined }
          : m
      )
    );
  };

  // Create the demarche
  const handleCreateDemarche = async () => {
    if (!selectedModele) return;
    
    setStep('loading');
    
    try {
      const result = await onCreateDemarche(
        selectedModele.id,
        selectedDocuments
      );
      
      if (result.success) {
        setCreatedDemarcheId(result.demarcheId || null);
        setStep('success');
      } else {
        // Go back to review on error
        setStep('review');
      }
    } catch (error) {
      console.error('Error creating demarche:', error);
      setStep('review');
    }
  };

  // Navigate to dossier
  const handleViewDossier = () => {
    if (createdDemarcheId) {
      router.push(`/demarches/${createdDemarcheId}`);
      onClose();
    }
  };

  const handleUpdateTitle = async (title: string) => {
    if (createdDemarcheId) {
      await updateDemarcheTitleAction(createdDemarcheId, title);
      toaster.create({
        title: "Titre mis à jour",
        type: "success",
      });
    }
  };

  // Compute selected documents count
  const selectedDocumentsCount = Object.keys(selectedDocuments).length;

  return (
    <DialogRoot open={isOpen} onOpenChange={(e) => !e.open && onClose()} size="lg">
      <DialogContent>
        <DialogCloseTrigger />
        
        {/* Step 1: Search */}
        {step === 'search' && (
          <SearchStep
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filteredModeles={filteredModeles}
            isLoading={isLoading}
            onSelectModele={handleSelectModele}
            onClose={onClose}
          />
        )}

        {/* Step 2: Review */}
        {step === 'review' && selectedModele && (
          <ReviewStep
            modeleTitre={selectedModele.titre}
            matchedDocuments={matchedDocuments}
            selectedDocumentsCount={selectedDocumentsCount}
            documentsCollection={documentsCollection}
            onRemoveDocument={handleRemoveDocument}
            onChangeDocument={handleChangeDocument}
            onBack={() => setStep('search')}
            onClose={onClose}
            onSubmit={handleCreateDemarche}
          />
        )}

        {/* Step 3: Loading */}
        {step === 'loading' && (
          <LoadingStep message="Création du dossier en cours..." />
        )}

        {/* Step 4: Success */}
        {step === 'success' && selectedModele && (
          <SuccessStep
            modeleTitre={selectedModele.titre}
            dossierId={createdDemarcheId || ''}
            onClose={onClose}
            onViewDossier={handleViewDossier}
            onUpdateTitle={handleUpdateTitle}
          />
        )}
      </DialogContent>
    </DialogRoot>
  );
}
