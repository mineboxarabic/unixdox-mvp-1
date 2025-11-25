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
          title: "Success",
          description: "Model deleted successfully",
          type: "success",
        });
      } else {
        toaster.create({
          title: "Error",
          description: result.error || "Failed to delete model",
          type: "error",
        });
      }
    } catch (error) {
      toaster.create({
        title: "Error",
        description: "An unexpected error occurred",
        type: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Link href={`/admin/modele-demarche/${modeleId}/edit`}>
        <IconButton aria-label="Edit model" variant="ghost" size="sm">
          <FiEdit />
        </IconButton>
      </Link>

      <DialogRoot role="alertdialog">
        <DialogTrigger asChild>
          <IconButton
            aria-label="Delete model"
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
            <DialogTitle>Delete Model</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
            Are you sure you want to delete this model? This action cannot be
            undone.
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button colorPalette="red" onClick={handleDelete} loading={isDeleting}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </>
  );
}
