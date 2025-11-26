"use client"

import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  Button,
} from "@/shared/components/ui";
import { Text, VStack, Checkbox } from "@chakra-ui/react";
import { useState } from "react";
import { toaster } from "@/shared/components/ui/toaster";
import { removeDocument } from "../../actions";

interface DeleteDocumentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  documentId: string;
  documentName: string;
}

export function DeleteDocumentDialog({ isOpen, onClose, documentId, documentName }: DeleteDocumentDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [deleteFromDrive, setDeleteFromDrive] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const result = await removeDocument(documentId, deleteFromDrive);
      if (result.success) {
        toaster.create({ title: "Document supprimé avec succès", type: "success" });
        onClose();
      } else {
        toaster.create({ title: "Erreur lors de la suppression", description: result.error, type: "error" });
      }
    } catch (error) {
      toaster.create({ title: "Une erreur est survenue", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer le document</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack align="stretch" gap={4}>
            <Text>
              Êtes-vous sûr de vouloir supprimer le document <strong>{documentName}</strong> ?
              Cette action est irréversible.
            </Text>
            
            <Checkbox.Root 
                checked={deleteFromDrive} 
                onCheckedChange={(e) => setDeleteFromDrive(!!e.checked)}
            >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>Supprimer également de Google Drive</Checkbox.Label>
            </Checkbox.Root>
          </VStack>
        </DialogBody>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose} disabled={isLoading}>
            Annuler
          </Button>
          <Button colorPalette="red" onClick={handleDelete} loading={isLoading}>
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
