import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  Button,
  Input,
  FormInput,
  SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValueText,
} from "@/shared/components/ui";
import { Box, VStack, HStack, Text, createListCollection } from "@chakra-ui/react";
import { DocumentType, Document } from "@prisma/client";
import { useState, useEffect } from "react";
import { toaster } from "@/shared/components/ui/toaster";
import { updateDocumentDetails } from "../../actions";

interface EditDocumentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  document: any;
}

export function EditDocumentDialog({ isOpen, onClose, document }: EditDocumentDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    nomFichier: "",
    type: "" as DocumentType,
    tags: "",
    dateExpiration: "",
  });

  useEffect(() => {
    if (document) {
      setFormData({
        nomFichier: document.nomFichier || "",
        type: document.type as DocumentType,
        tags: document.tags ? document.tags.join(", ") : "",
        dateExpiration: document.dateExpiration 
            ? new Date(document.dateExpiration).toISOString().split('T')[0] 
            : "",
      });
    }
  }, [document]);

  const handleSubmit = async () => {
    if (!document) return;
    setIsLoading(true);

    try {
      const tagsArray = formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const result = await updateDocumentDetails(document.id, {
        nomFichier: formData.nomFichier,
        type: formData.type,
        tags: tagsArray,
        dateExpiration: formData.dateExpiration ? new Date(formData.dateExpiration) : null,
      });

      if (result.success) {
        toaster.create({ title: "Document mis à jour avec succès", type: "success" });
        onClose();
      } else {
        toaster.create({ title: "Erreur lors de la mise à jour", description: result.error, type: "error" });
      }
    } catch (error) {
      toaster.create({ title: "Une erreur est survenue", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const documentTypes = createListCollection({
    items: Object.values(DocumentType).map((type) => ({ label: type, value: type })),
  });

  return (
    <DialogRoot open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier le document</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack gap={4} align="stretch">
            <FormInput
              label="Nom du fichier"
              value={formData.nomFichier}
              onChange={(e) => setFormData({ ...formData, nomFichier: e.target.value })}
            />

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={1.5}>Type de document</Text>
              <SelectRoot 
                collection={documentTypes}
                value={[formData.type]} 
                onValueChange={(e) => setFormData({ ...formData, type: e.value[0] as DocumentType })}
              >
                <SelectTrigger>
                  <SelectValueText placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.items.map((type) => (
                    <SelectItem key={type.value} item={type}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Box>

            <FormInput
              label="Tags (séparés par des virgules)"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="facture, 2024, important"
            />

            <FormInput
              label="Date d'expiration"
              type="date"
              value={formData.dateExpiration}
              onChange={(e) => setFormData({ ...formData, dateExpiration: e.target.value })}
            />
          </VStack>
        </DialogBody>
        <DialogFooter>
          <Button  variant="ghost" onClick={onClose} disabled={isLoading}>
            Annuler
          </Button>
          <Button onClick={handleSubmit} loading={isLoading}>
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
