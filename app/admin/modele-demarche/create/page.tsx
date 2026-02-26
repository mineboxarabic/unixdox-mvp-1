"use client";

import { useState } from "react";
import { createModeleDemarche } from "@/features/admin/actions";
import { toaster } from "@/shared/components/ui/toaster";
import { DemarcheCategorie } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Container } from "@chakra-ui/react";
import { ModeleDemarcheForm } from "@/features/admin/ui/ModeleDemarcheForm";

export default function CreateModeleDemarchePage() {
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
            const result = await createModeleDemarche({
                titre,
                description,
                categorie,
                typesDocumentsRequis,
            });

            if (result.success) {
toaster.create({
                    title: "Succès",
                    description: "Modèle créé avec succès !",
                    type: "success",
                });
                router.push("/admin/modele-demarche");
            } else {
toaster.create({
                    title: "Erreur",
                    description: "Échec de la création du modèle",
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
        <Container maxW="container.md" py={10}>
            <ModeleDemarcheForm
                onSubmit={handleSubmit}
                loading={loading}
title="Créer un nouveau modèle de démarche"
                description="Définissez un nouveau modèle de procédure pour les utilisateurs."
                submitLabel="Créer le modèle"
            />
        </Container>
    );
}
