"use client";

import { useState } from "react";
import { deleteModeleDemarche } from "@/features/admin/actions";
import { IconButton } from "@chakra-ui/react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Link from "next/link";
import { toaster } from "@/shared/components/ui/toaster";
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogActionTrigger,
  DialogCloseTrigger,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";

interface ModeleActionsProps {
  modeleId: string;
}

export function ModeleActions({ modeleId }: ModeleActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteModeleDemarche(modeleId);
      if (result.success) {
toaster.create({
          title: "Succès",
          description: "Modèle supprimé avec succès",
          type: "success",
        });
      } else {
toaster.create({
          title: "Erreur",
          description: result.error || "Échec de la suppression du modèle",
          type: "error",
        });
      }
    } catch (error) {
toaster.create({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
        type: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Link href={`/admin/modele-demarche/${modeleId}/edit`}>
        <IconButton aria-label="Modifier le modèle" variant="ghost" size="sm">
          <FiEdit />
        </IconButton>
      </Link>

      <DialogRoot role="alertdialog">
        <DialogTrigger asChild>
<IconButton
            aria-label="Supprimer le modèle"
            variant="ghost"
            colorPalette="red"
            size="sm"
            loading={isDeleting}
          >
            <FiTrash2 />
          </IconButton>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer le modèle</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
<DialogBody>
            Êtes-vous sûr de vouloir supprimer ce modèle ? Cette action est irréversible.
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Annuler</Button>
            </DialogActionTrigger>
            <Button colorPalette="red" onClick={handleDelete} loading={isDeleting}>
Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </>
  );
}
