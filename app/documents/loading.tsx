import { HStack, Text, Flex } from '@chakra-ui/react';
import { PageLayout } from '@/shared/components/PageLayout';
import { FiFileText } from 'react-icons/fi';
import { DocumentsGridSkeleton } from '@/features/documents/ui/components/DocumentsGridSkeleton';
import { DocumentSearch } from '@/features/documents/ui/components/DocumentSearch';
import { UploadDocumentButton } from '@/features/documents/ui/components/UploadDocumentButton';
import { DocumentsFilters } from '@/features/documents/ui/components/DocumentsFilters';

export default function Loading() {
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

            <DocumentsGridSkeleton />
        </PageLayout>
    );
}
