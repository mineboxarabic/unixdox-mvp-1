'use client';

import { useState, useEffect } from 'react';
import { 
  DialogRoot, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogActionTrigger,
  DialogCloseTrigger 
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { FormInput } from '@/shared/components/ui/form-input';
import { VStack } from '@chakra-ui/react';
import { toaster } from '@/shared/components/ui/toaster';
import { updateDemarcheAction } from '../actions';

interface EditDemarcheDialogProps {
  isOpen: boolean;
  onClose: () => void;
  demarche: {
    id: string;
    titre?: string | null;
    notes?: string | null;
  };
}

export function EditDemarcheDialog({
  isOpen,
  onClose,
  demarche,
}: EditDemarcheDialogProps) {
  const [titre, setTitre] = useState(demarche.titre || '');
  const [notes, setNotes] = useState(demarche.notes || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTitre(demarche.titre || '');
      setNotes(demarche.notes || '');
    }
  }, [isOpen, demarche]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('titre', titre);
      formData.append('notes', notes);

      const result = await updateDemarcheAction(demarche.id, formData);

      if (result.success) {
        toaster.create({
          title: "Démarche mise à jour",
          type: "success",
        });
        onClose();
      } else {
        toaster.create({
          title: "Erreur",
          description: result.error || "Une erreur est survenue",
          type: "error",
        });
      }
    } catch (error) {
      toaster.create({
        title: "Erreur",
        description: "Une erreur est survenue",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier la démarche</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack gap={4} align="stretch">
            <FormInput
              label="Titre"
              name="titre"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              placeholder="Titre de la démarche"
            />
            
            <FormInput
              label="Notes"
              name="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes personnelles..."
              textarea
              rows={4}
            />
          </VStack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={onClose}>Annuler</Button>
          </DialogActionTrigger>
          <Button 
            onClick={handleSubmit} 
            loading={isSubmitting}
          >
            Enregistrer
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
