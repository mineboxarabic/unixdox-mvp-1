import { Box, Heading, Text, VStack, Flex } from '@chakra-ui/react';
import { Suspense } from 'react';
import { DocumentSearch } from '../components/DocumentSearch';
import { DocumentsFilters } from '../components/DocumentsFilters';
import { DocumentsList } from '../components/DocumentsList';
import { documentService } from '../../services/document.service';
import { requireAuth } from '@/shared/auth/server';
import { DocumentType, DocumentStatut } from '@prisma/client';
import { UploadDocumentButton } from '../components/UploadDocumentButton';

interface DocumentsPageProps {
    searchParams: {
        search?: string;
        type?: string;
        statut?: string;
        tags?: string;
    };
}

export default async function DocumentsPage({ searchParams }: DocumentsPageProps) {
    const session = await requireAuth();
    const userId = session.user?.id;

    if (!userId) {
        return null; // Or redirect
    }

    // Await searchParams as it's now a Promise in Next.js
    const params = await searchParams;

    const filters = {
        search: params.search,
        type: params.type as DocumentType | undefined,
        statut: params.statut as DocumentStatut | undefined,
        tags: params.tags ? params.tags.split(',') : undefined,
    };

    const documents = await documentService.searchDocuments(userId, filters);

    return (
        <Box minH="100vh" bg="bg.canvas" p="6">
            <Box maxW="1400px" mx="auto">
                {/* Header */}
                <Flex
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    gap="6"
                    mb="10"
                >
                    <VStack gap={2}>
                        <Heading size="2xl" color="neutral.900" textAlign="center">
                            Mes Documents
                        </Heading>
                        <Text color="text.fg.muted" fontSize="lg" textAlign="center">
                            Gérez et organisez tous vos documents administratifs
                        </Text>
                    </VStack>

                    {/* Search Bar */}
                    <DocumentSearch />

                    {/* Action Buttons */}
                    <Flex gap="4" flexWrap="wrap" justifyContent="center">
                        <UploadDocumentButton />
                    </Flex>
                </Flex>

                {/* Filters */}
                <Flex justify="center" mb="8">
                    <DocumentsFilters />
                </Flex>

                {/* Content */}
                <Suspense fallback={<Text textAlign="center">Chargement...</Text>}>
                    <DocumentsList documents={documents} />
                </Suspense>
            </Box>
        </Box>
    );
}
