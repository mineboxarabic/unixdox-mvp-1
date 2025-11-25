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
                    title: "Success",
                    description: "Model created successfully!",
                    type: "success",
                });
                router.push("/admin/modele-demarche");
            } else {
                toaster.create({
                    title: "Error",
                    description: "Failed to create model",
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
        <Container maxW="container.md" py={10}>
            <ModeleDemarcheForm
                onSubmit={handleSubmit}
                loading={loading}
                title="Create New Modele Demarche"
                description="Define a new procedure template for users."
                submitLabel="Create Model"
            />
        </Container>
    );
}
