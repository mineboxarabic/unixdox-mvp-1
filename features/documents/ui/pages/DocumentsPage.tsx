import { Text, HStack, Box, Flex } from '@chakra-ui/react';
import { Suspense } from 'react';
import { DocumentSearch } from '../components/DocumentSearch';
import { DocumentsFilters } from '../components/DocumentsFilters';
import { DocumentsList } from '../components/DocumentsList';
import { documentService } from '../../services/document.service';
import { requireAuth } from '@/shared/auth/server';
import { DocumentType, DocumentStatut } from '@prisma/client';
import { UploadDocumentButton } from '../components/UploadDocumentButton';
import { PageLayout } from '@/shared/components/PageLayout';
import { FiFileText } from 'react-icons/fi';

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
        <PageLayout
            title="Mes Documents"
            icon={<FiFileText size={24} color="var(--chakra-colors-primary-600)" />}
            headerLeft={
                <HStack gap={2} fontSize="sm" color="fg.muted">
                    <Text>Documents</Text>
                    <Text>&gt;</Text>
                    <Text fontWeight="medium" color="fg.default">
                        Mes documents
                    </Text>
                </HStack>
            }
            headerCenter={<DocumentSearch />}
            action={<UploadDocumentButton />}
        >
            <Flex justify="center" mb="8">
                <DocumentsFilters />
            </Flex>

            <Suspense fallback={<Text textAlign="center">Chargement...</Text>}>
                <DocumentsList documents={documents} />
            </Suspense>
        </PageLayout>
    );
}
