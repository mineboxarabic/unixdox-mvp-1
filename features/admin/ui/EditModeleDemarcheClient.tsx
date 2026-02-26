"use client";

import { useState } from "react";
import { updateModeleDemarche } from "@/features/admin/actions";
import { toaster } from "@/shared/components/ui/toaster";
import { DemarcheCategorie, ModeleDemarche } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ModeleDemarcheForm } from "./ModeleDemarcheForm";

interface EditModeleDemarcheClientProps {
  modele: ModeleDemarche;
}

export function EditModeleDemarcheClient({ modele }: EditModeleDemarcheClientProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const titre = formData.get("titre") as string;
    const description = formData.get("description") as string;
    const categorie = formData.get("categorie") as DemarcheCategorie;

    // Get all selected document types
    const typesDocumentsRequis = formData.getAll("typesDocumentsRequis") as string[];

    try {
      const result = await updateModeleDemarche(modele.id, {
        titre,
        description,
        categorie,
        typesDocumentsRequis,
      });

      if (result.success) {
toaster.create({
          title: "Succès",
          description: "Modèle mis à jour avec succès !",
          type: "success",
        });
        router.push("/admin/modele-demarche");
        router.refresh();
      } else {
toaster.create({
          title: "Erreur",
          description: "Échec de la mise à jour du modèle",
          type: "error",
        });
      }
    } catch (e) {
toaster.create({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
        type: "error",
      });
    }
    setLoading(false);
  }

  return (
    <ModeleDemarcheForm
      initialData={modele}
      onSubmit={handleSubmit}
      loading={loading}
title="Modifier le modèle de démarche"
      description="Mettez à jour le modèle de procédure."
      submitLabel="Mettre à jour le modèle"
    />
  );
}
