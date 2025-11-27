'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { ModeleDemarche, Document } from '@prisma/client';
import { DemarchesPage } from '@/features/demarches/ui/pages/DemarchesPage';
import { CreateDemarcheDialog } from '@/features/demarches/ui/CreateDemarcheDialog';
import type { DemarcheListItem, DemarcheDocuments } from '@/features/demarches/types/schemas';
import { matchDocumentsToRequirementsAction } from '@/features/documents/actions';
import { startNewDemarcheAction } from '@/features/demarches/actions';

interface DemarchesPageClientProps {
  demarches: DemarcheListItem[];
  modeles: ModeleDemarche[];
  userDocuments: Document[];
  userEmail?: string;
  isLoading?: boolean;
}

export function DemarchesPageClient({
  demarches,
  modeles,
  userDocuments,
  userEmail,
  isLoading,
}: DemarchesPageClientProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleMatchDocuments = useCallback(async (modeleId: string) => {
    const modele = modeles.find((m) => m.id === modeleId);
    if (!modele) {
      return { matches: {}, missing: [], replacements: {} };
    }

    const result = await matchDocumentsToRequirementsAction(modele.typesDocumentsRequis);
    
    if (result.success && result.data) {
      return result.data;
    }
    
    return { 
      matches: {}, 
      missing: modele.typesDocumentsRequis, 
      replacements: {} 
    };
  }, [modeles]);

  const handleCreateDemarche = useCallback(async (
    modeleId: string,
    documents: DemarcheDocuments,
    name?: string
  ) => {
    const formData = new FormData();
    formData.append('modeleId', modeleId);
    formData.append('documents', JSON.stringify(documents));
    if (name) {
      formData.append('notes', name);
    }

    const result = await startNewDemarcheAction(formData);
    
    if (result.success && result.data) {
      router.refresh();
      return { success: true, demarcheId: result.data.id, demarcheTitle: result.data.titre };
    }
    
    return { success: false };
  }, [router]);

  return (
    <>
      <DemarchesPage
        demarches={demarches}
        isLoading={isLoading}
        onCreateDemarche={() => setIsDialogOpen(true)}
      />
      
      <CreateDemarcheDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        modeles={modeles}
        userDocuments={userDocuments}
        userEmail={userEmail}
        onMatchDocuments={handleMatchDocuments}
        onCreateDemarche={handleCreateDemarche}
      />
    </>
  );
}
