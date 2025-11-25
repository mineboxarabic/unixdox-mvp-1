"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { FormInput } from "@/shared/components/ui/form-input";
import { Card, CardHeader, CardBody, CardFooter } from "@/shared/components/ui/card";
import { DemarcheCategorie, DocumentType, ModeleDemarche } from "@prisma/client";
import {
    Box,
    VStack,
    Heading,
    Text,
    SimpleGrid,
    Checkbox as ChakraCheckbox,
    chakra
} from "@chakra-ui/react";

interface ModeleDemarcheFormProps {
    initialData?: Partial<ModeleDemarche>;
    onSubmit: (formData: FormData) => Promise<void>;
    loading: boolean;
    title: string;
    description: string;
    submitLabel: string;
}

export function ModeleDemarcheForm({
    initialData,
    onSubmit,
    loading,
    title,
    description,
    submitLabel
}: ModeleDemarcheFormProps) {
    return (
        <Card>
            <CardHeader>
                <VStack align="start" gap={1}>
                    <Heading size="md">{title}</Heading>
                    <Text color="fg.muted" fontSize="sm">
                        {description}
                    </Text>
                </VStack>
            </CardHeader>
            <form action={onSubmit}>
                <CardBody>
                    <VStack gap={5} align="stretch">
                        <FormInput
                            label="Title"
                            name="titre"
                            placeholder="e.g. Renewal of Passport"
                            required
                            defaultValue={initialData?.titre || ""}
                        />

                        <FormInput
                            label="Description"
                            name="description"
                            placeholder="Detailed description of the process..."
                            textarea
                            rows={3}
                            resize="vertical"
                            defaultValue={initialData?.description || ""}
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
                                defaultValue={initialData?.categorie || DemarcheCategorie.ADMINISTRATIF}
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
                                        <ChakraCheckbox.Root 
                                            key={type} 
                                            defaultChecked={initialData?.typesDocumentsRequis?.includes(type)}
                                        >
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
                        {loading ? "Saving..." : submitLabel}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
