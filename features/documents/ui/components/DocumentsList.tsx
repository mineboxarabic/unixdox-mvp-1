'use client';

import { Box, SimpleGrid, Text, VStack, IconButton, MenuRoot, MenuTrigger, MenuContent, MenuItem, useDisclosure, Flex } from '@chakra-ui/react';
import { Document } from '@prisma/client';
import { LuEllipsisVertical, LuPencil, LuTrash2, LuFileText } from 'react-icons/lu';
import { useState } from 'react';
import { EditDocumentDialog } from './EditDocumentDialog';
import { DeleteDocumentDialog } from './DeleteDocumentDialog';
import { DocumentDetailsDialog } from './DocumentDetailsDialog';
import { Badge } from '@/shared/components/ui/badge';
import { getDrivePreviewUrl, getDriveThumbnailUrl } from '../../utils';
import { DocumentsEmptyState } from './DocumentsEmptyState';
import { DocumentStatusBadge } from '@/shared/components/documents/DocumentStatusBadge';

interface DocumentsListProps {
    documents: Document[];
}

export function DocumentsList({ documents }: DocumentsListProps) {
    const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
    const { open: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
    const { open: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
    const { open: isDetailsOpen, onOpen: onDetailsOpen, onClose: onDetailsClose } = useDisclosure();

    const handleEdit = (doc: Document) => {
        setSelectedDoc(doc);
        onEditOpen();
    };

    const handleDelete = (doc: Document) => {
        setSelectedDoc(doc);
        onDeleteOpen();
    };

    const handleViewDetails = (doc: Document) => {
        setSelectedDoc(doc);
        onDetailsOpen();
    };

    const handleEditFromDetails = () => {
        onDetailsClose();
        onEditOpen();
    };

    const handleDeleteFromDetails = () => {
        onDetailsClose();
        onDeleteOpen();
    };

    if (documents.length === 0) {
        return <DocumentsEmptyState />;
    }

    return (
        <>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} gap={6}>
                {documents.map((doc) => {
                    const previewUrl = getDrivePreviewUrl(doc.urlStockage);
                    const thumbnailUrl = getDriveThumbnailUrl(doc.urlStockage);

                    return (
                        <Box
                            key={doc.id}
                            bg="bg.surface"
                            borderRadius="xl"
                            border="1px solid"
                            borderColor="border.muted"
                            transition="all 0.2s ease-in-out"
                            cursor="pointer"
                            onClick={() => handleViewDetails(doc)}
                            _hover={{
                                boxShadow: "lg",
                                borderColor: "primary.200",
                                transform: "translateY(-2px)"
                            }}
                        >
                            <Box
                                position="relative"
                                width="100%"
                                height="200px"
                                bg="primary.50"
                                overflow="hidden"
                                borderTopRadius="xl"
                            >
                                {thumbnailUrl ? (
                                    <img
                                        src={thumbnailUrl}
                                        alt={doc.nomFichier}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                ) : previewUrl ? (
                                    <iframe
                                        src={previewUrl}
                                        title={doc.nomFichier}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            border: 'none',
                                            pointerEvents: 'none'
                                        }}
                                    />
                                ) : (
                                    <Flex
                                        width="100%"
                                        height="100%"
                                        align="center"
                                        justify="center"
                                        color="primary.300"
                                    >
                                        <LuFileText size={80} />
                                    </Flex>
                                )}

                                {/* Status Badge Overlay */}
                                <Box
                                    position="absolute"
                                    top={3}
                                    left={3}
                                    zIndex={2}
                                >
                                    <DocumentStatusBadge status={doc.statut} />
                                </Box>

                                <Box position="absolute" top={2} right={2} zIndex={10} onClick={(e) => e.stopPropagation()}>
                                    <MenuRoot>
                                        <MenuTrigger asChild>
                                            <IconButton
                                                aria-label="Options"
                                                variant="solid"
                                                size="xs"
                                                rounded="full"
                                                bg="white"
                                                color="gray.700"
                                                shadow="md"
                                                _hover={{ bg: 'gray.100', transform: 'scale(1.05)' }}
                                                transition="all 0.2s"
                                            >
                                                <LuEllipsisVertical />
                                            </IconButton>
                                        </MenuTrigger>
                                        <MenuContent>
                                            <MenuItem value="edit" onClick={(e) => {
                                                e.stopPropagation();
                                                handleEdit(doc);
                                            }}>
                                                <LuPencil /> Modifier
                                            </MenuItem>
                                            <MenuItem value="delete" color="red.500" onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(doc);
                                            }}>
                                                <LuTrash2 /> Supprimer
                                            </MenuItem>
                                        </MenuContent>
                                    </MenuRoot>
                                </Box>
                            </Box>

                            {/* Document Info */}
                            <VStack align="stretch" p={4} gap={3}>
                                <VStack align="stretch" gap={1}>
                                    <Text
                                        fontWeight="semibold"
                                        fontSize="sm"
                                        color="text.fg"
                                        lineClamp={2}
                                        title={doc.nomFichier}
                                    >
                                        {doc.nomFichier}
                                    </Text>
                                    <Text fontSize="xs" color="text.fg.muted">
                                        {new Date(doc.dateUpload).toLocaleDateString('fr-FR', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </Text>
                                </VStack>

                                <Flex gap={2} flexWrap="wrap">
                                    <Badge variant="outline" size="sm" colorScheme="neutral">
                                        {doc.type}
                                    </Badge>
                                </Flex>
                            </VStack>
                        </Box>
                    );
                })}
            </SimpleGrid >

            {selectedDoc && (
                <>
                    <DocumentDetailsDialog
                        isOpen={isDetailsOpen}
                        onClose={onDetailsClose}
                        document={{
                            id: selectedDoc.id,
                            name: selectedDoc.nomFichier,
                            type: selectedDoc.type,
                            url: selectedDoc.urlStockage || undefined,
                            size: selectedDoc.size || undefined,
                            status: selectedDoc.statut,
                            tags: selectedDoc.tags,
                            expirationDate: selectedDoc.dateExpiration,
                            nomFichier: selectedDoc.nomFichier
                        }}
                        onEdit={handleEditFromDetails}
                        onDelete={handleDeleteFromDetails}
                    />
                    <EditDocumentDialog
                        isOpen={isEditOpen}
                        onClose={onEditClose}
                        document={selectedDoc}
                    />
                    <DeleteDocumentDialog
                        isOpen={isDeleteOpen}
                        onClose={onDeleteClose}
                        documentId={selectedDoc.id}
                        documentName={selectedDoc.nomFichier}
                    />
                </>
            )
            }
        </>
    );
}
