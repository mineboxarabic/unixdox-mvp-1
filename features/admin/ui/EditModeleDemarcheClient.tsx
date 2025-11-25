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
          title: "Success",
          description: "Model updated successfully!",
          type: "success",
        });
        router.push("/admin/modele-demarche");
        router.refresh();
      } else {
        toaster.create({
          title: "Error",
          description: "Failed to update model",
          type: "error",
        });
      }
    } catch (e) {
      toaster.create({
        title: "Error",
        description: "An unexpected error occurred",
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
      title="Edit Modele Demarche"
      description="Update the procedure template."
      submitLabel="Update Model"
    />
  );
}
