"use client";

import { Box, Flex, Text, HStack, IconButton, MenuRoot, MenuTrigger, MenuContent, MenuItem, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import {
  Badge,
  EmptyState,
  FileUpload,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/shared/components/ui";
import { Button } from "@/shared/components/ui/button";
import { LuFiles, LuEllipsisVertical, LuPencil, LuTrash2 } from "react-icons/lu";
import type { Document } from "../../types";
import { DocumentIcon } from "@/shared/components/documents/DocumentIcon";
import { DocumentStatusBadge } from "@/shared/components/documents/DocumentStatusBadge";
import { formatDate } from "@/shared/utils/date";
import { EditDocumentDialog } from "@/features/documents/ui/components/EditDocumentDialog";
import { DeleteDocumentDialog } from "@/features/documents/ui/components/DeleteDocumentDialog";

export interface RecentDocumentsCardProps {
  documents: Document[];
  onViewAll?: () => void;
  onFileUpload?: (files: File[]) => void;
}

/**
 * Documents récents card — full-width table of recent documents
 * Matches Figma v3.0: white bg, neutral.200 border, rounded 2xl
 * Table has its own border + rounded lg, columns: Type, Nom, Statut, Expiration, Tags, Taille
 */
export function RecentDocumentsCard({
  documents,
  onViewAll,
  onFileUpload,
}: RecentDocumentsCardProps) {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const { open: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { open: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  const handleEdit = (doc: Document) => {
    setSelectedDoc(doc);
    onEditOpen();
  };

  const handleDelete = (doc: Document) => {
    setSelectedDoc(doc);
    onDeleteOpen();
  };

  /** Format file size to human-readable string */
  const formatSize = (bytes?: number) => {
    if (!bytes) return "--";
const sizes = ["Octets", "Ko", "Mo", "Go", "To"];
    if (bytes === 0) return "0 Octet";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
    return Math.round(bytes / Math.pow(1024, i)) + "" + sizes[i];
  };

  const renderEmptyState = () => (
    <Box>
      {onFileUpload ? (
        <FileUpload onFileSelect={onFileUpload} multiple />
      ) : (
        <EmptyState
          icon={<LuFiles size={48} />}
          title="Aucun document"
          description="Vos documents récents apparaîtront ici"
        />
      )}
    </Box>
  );

  const renderDocumentsTable = () => (
    <Box
      border="1px solid"
      borderColor="neutral.200"
      borderRadius="lg"
      overflow="hidden"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Nom du fichier</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Date d&apos;expiration</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead textAlign="end">Taille</TableHead>
            <TableHead textAlign="end"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((document) => (
            <TableRow
              key={document.id}
              _hover={{ bg: "gray.50" }}
            >
              <TableCell>
                <Box color="gray.500">
                  <DocumentIcon type={document.type} size={20} />
                </Box>
              </TableCell>
              <TableCell>
                <Text fontSize="sm" fontWeight="medium" color="gray.800">
                  {document.name}
                </Text>
              </TableCell>
              <TableCell>
                <DocumentStatusBadge status={document.status} />
              </TableCell>
              <TableCell>
                <Text fontSize="sm" color="gray.500">
                  {formatDate(document.expirationDate)}
                </Text>
              </TableCell>
              <TableCell>
                <HStack gap={1.5} flexWrap="wrap">
                  {document.tags && document.tags.length > 0 ? (
                    document.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="subtle"
                        colorScheme="neutral"
                        bg="gray.100"
                        color="gray.800"
                        fontSize="xs"
                      >
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <Text color="gray.400" fontSize="sm">--</Text>
                  )}
                </HStack>
              </TableCell>
              <TableCell textAlign="end">
                <Text fontSize="sm" color="gray.500">
                  {formatSize(document.size)}
                </Text>
              </TableCell>
              <TableCell textAlign="end">
                <MenuRoot>
                  <MenuTrigger asChild>
                    <IconButton
                      aria-label="Options"
                      variant="ghost"
                      size="xs"
                      color="gray.500"
                    >
                      <LuEllipsisVertical />
                    </IconButton>
                  </MenuTrigger>
                  <MenuContent>
                    <MenuItem value="edit" onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(document);
                    }}>
                      <LuPencil /> Modifier
                    </MenuItem>
                    <MenuItem value="delete" color="red.500" onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(document);
                    }}>
                      <LuTrash2 /> Supprimer
                    </MenuItem>
                  </MenuContent>
                </MenuRoot>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="neutral.200"
      borderRadius="2xl"
      p="4"
      display="flex"
      flexDirection="column"
      gap="3"
    >
      {/* Card header */}
      <Flex gap="2" alignItems="center">
        <LuFiles size={20} color="var(--chakra-colors-gray-500)" />
        <Text fontSize="lg" fontWeight="semibold" color="gray.800">
          Documents récents
        </Text>
      </Flex>

      {/* Card body */}
      <Box>
        {documents.length === 0 ? renderEmptyState() : renderDocumentsTable()}
      </Box>

      {/* Footer — view all link */}
      {documents.length > 0 && (
        <Flex justifyContent="flex-end">
          <Button variant="ghost" size="xs" onClick={onViewAll}>
            Voir tout
          </Button>
        </Flex>
      )}

      {selectedDoc && (
        <>
          <EditDocumentDialog
            isOpen={isEditOpen}
            onClose={onEditClose}
            document={selectedDoc as any}
          />
          <DeleteDocumentDialog
            isOpen={isDeleteOpen}
            onClose={onDeleteClose}
            documentId={selectedDoc.id}
            documentName={selectedDoc.name || selectedDoc.nomFichier || ""}
          />
        </>
      )}
    </Box>
  );
}
