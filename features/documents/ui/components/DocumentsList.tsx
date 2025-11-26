'use client';

import { Box, SimpleGrid, Text, VStack, HStack, IconButton, MenuRoot, MenuTrigger, MenuContent, MenuItem, useDisclosure, Flex } from '@chakra-ui/react';
import { Document, DocumentStatut } from '@prisma/client';
import { LuEllipsisVertical, LuEye, LuPencil, LuTrash2, LuFileText } from 'react-icons/lu';
import { useState } from 'react';
import { EditDocumentDialog } from './EditDocumentDialog';
import { DeleteDocumentDialog } from './DeleteDocumentDialog';
import { DocumentDetailsDialog } from './DocumentDetailsDialog';
import { Badge } from '@/shared/components/ui/badge';

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

    // Generate Google Drive preview URL for iframe
    const getDrivePreviewUrl = (url: string | null) => {
        if (!url) return null;
        // Convert Google Drive view URL to preview URL for iframe embedding
        if (url.includes("drive.google.com") && url.includes("/view")) {
            // Add parameters to reduce Google Drive UI controls
            const previewUrl = url.replace("/view", "/preview");
            const params = previewUrl.includes('?') ? '&' : '?';
            return `${previewUrl}${params}rm=minimal&embedded=true`;
        }
        return null;
    };

    if (documents.length === 0) {
        return (
            <Box position="relative" overflow="hidden" minH="400px" mx="auto" maxW="600px">
                {/* Gradient Background */}
                <Box
                    position="absolute"
                    left="50%"
                    bottom="0"
                    transform="translateX(-50%)"
                    width="500px"
                    height="300px"
                    bgGradient="radial-gradient(ellipse 500px 300px at 50% 100%, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.12) 30%, rgba(59, 130, 246, 0.06) 50%, transparent 75%)"
                    filter="blur(50px)"
                    pointerEvents="none"
                    zIndex="0"
                />

                <Box position="relative" zIndex="1">
                    <Box
                        bg="bg.surface"
                        borderRadius="xl"
                        border="1px solid"
                        borderColor="border.muted"
                        p={8}
                        boxShadow="sm"
                    >
                        <VStack gap={6}>
                            <Box
                                p={5}
                                bg="primary.50"
                                borderRadius="full"
                                color="primary.600"
                            >
                                <LuFileText size={48} />
                            </Box>
                            <VStack gap={2}>
                                <Text fontSize="lg" fontWeight="semibold" color="text.fg">
                                    Aucun document trouvé
                                </Text>
                                <Text fontSize="sm" color="text.fg.muted" textAlign="center">
                                    Commencez par ajouter votre premier document
                                </Text>
                            </VStack>
                        </VStack>
                    </Box>
                </Box>
            </Box>
        );
    }

    return (
        <>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} gap={6}>
                {documents.map((doc) => {
                    const previewUrl = getDrivePreviewUrl(doc.urlStockage);

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
                                {previewUrl ? (
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
                                    <Badge colorScheme={getStatusColor(doc.statut)} size="sm">
                                        {doc.statut}
                                    </Badge>
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

function getStatusColor(status: DocumentStatut) {
    switch (status) {
        case 'VERIFIE':
            return 'success';
        case 'EN_ATTENTE':
            return 'warning';
        case 'REFUSE':
            return 'danger';
        case 'EXPIRE':
            return 'neutral';
        default:
            return 'neutral';
    }
}
