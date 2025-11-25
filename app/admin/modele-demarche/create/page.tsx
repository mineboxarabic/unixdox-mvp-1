"use client";

import { useState } from "react";
import { createModeleDemarche } from "@/features/admin/actions";
import { Button } from "@/shared/components/ui/button";
import { FormInput } from "@/shared/components/ui/form-input";
import { Card, CardHeader, CardBody, CardFooter } from "@/shared/components/ui/card";
import { toaster } from "@/shared/components/ui/toaster";
import { DemarcheCategorie, DocumentType } from "@prisma/client";
import { useRouter } from "next/navigation";
import {
    Box,
    VStack,
    Heading,
    Text,
    Container,
    SimpleGrid,
    Checkbox as ChakraCheckbox,
    chakra
} from "@chakra-ui/react";

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
            <Card>
                <CardHeader>
                    <VStack align="start" gap={1}>
                        <Heading size="md">Create New Modele Demarche</Heading>
                        <Text color="fg.muted" fontSize="sm">
                            Define a new procedure template for users.
                        </Text>
                    </VStack>
                </CardHeader>
                <form action={handleSubmit}>
                    <CardBody>
                        <VStack gap={5} align="stretch">
                            <FormInput
                                label="Title"
                                name="titre"
                                placeholder="e.g. Renewal of Passport"
                                required
                            />

                            <FormInput
                                label="Description"
                                name="description"
                                placeholder="Detailed description of the process..."
                                textarea
                                rows={3}
                                resize="vertical"
                            />

                            <Box>
                                <Text fontSize="sm" fontWeight="medium" mb={1.5}>Category</Text>
                                <chakra.select
                                    name="categorie"
                                    width="full"
                                    height="10"
                                    px="4"
                                    borderRadius="md"
                                    border="1px solid"
                                    borderColor="border.default"
                                    bg="bg.surface"
                                    fontSize="md"
                                    _hover={{ borderColor: "primary.400" }}
                                    _focus={{
                                        borderColor: "primary.500",
                                        boxShadow: "0 0 0 1px var(--chakra-colors-primary-500)",
                                        outline: "none"
                                    }}
                                    defaultValue={DemarcheCategorie.ADMINISTRATIF}
                                >
                                    {Object.values(DemarcheCategorie).map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </chakra.select>
                            </Box>

                            <Box>
                                <Text fontSize="sm" fontWeight="medium" mb={2}>Required Documents</Text>
                                <Box
                                    p={4}
                                    borderWidth="1px"
                                    borderRadius="md"
                                    borderColor="border.default"
                                    maxH="300px"
                                    overflowY="auto"
                                >
                                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={3}>
                                        {Object.values(DocumentType).map((type) => (
                                            <ChakraCheckbox.Root key={type}>
                                                <ChakraCheckbox.HiddenInput name="typesDocumentsRequis" value={type} />
                                                <ChakraCheckbox.Control>
                                                    <ChakraCheckbox.Indicator />
                                                </ChakraCheckbox.Control>
                                                <ChakraCheckbox.Label fontSize="sm">{type}</ChakraCheckbox.Label>
                                            </ChakraCheckbox.Root>
                                        ))}
                                    </SimpleGrid>
                                </Box>
                                <Text fontSize="xs" color="fg.muted" mt={1}>
                                    Select all documents required for this procedure.
                                </Text>
                            </Box>
                        </VStack>
                    </CardBody>
                    <CardFooter>
                        <Button type="submit" disabled={loading} width="full">
                            {loading ? "Creating..." : "Create Model"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </Container>
    );
}
