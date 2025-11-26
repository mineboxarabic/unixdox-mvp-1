"use client";

import { Box, Flex, Text, HStack, IconButton } from "@chakra-ui/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
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
import { LuFiles, LuEye, LuPencil, LuTrash } from "react-icons/lu";
import type { Document } from "../../types";
import { DocumentIcon } from "@/shared/components/documents/DocumentIcon";
import { DocumentStatusBadge } from "@/shared/components/documents/DocumentStatusBadge";
import { formatDate } from "@/shared/utils/date";
import { useState } from "react";
import { EditDocumentDialog } from "@/features/documents/ui/components/EditDocumentDialog";
import { DeleteDocumentDialog } from "@/features/documents/ui/components/DeleteDocumentDialog";

export interface RecentDocumentsCardProps {
  documents: Document[];
  onViewAll?: () => void;
  onFileUpload?: (files: File[]) => void;
}

export function RecentDocumentsCard({
  documents,
  onViewAll,
  onFileUpload,
}: RecentDocumentsCardProps) {
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);
  const [deletingDocument, setDeletingDocument] = useState<Document | null>(null);

  const formatSize = (bytes?: number) => {
    if (!bytes) return "--";
    const sizes = ['Bytes', 'Kb', 'Mb', 'Gb', 'Tb'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
    return Math.round(bytes / Math.pow(1024, i)) + '' + sizes[i];
  };

  const renderEmptyState = () => (
    <Box>
      {onFileUpload ? (
        <FileUpload onFileSelect={onFileUpload} multiple />
      ) : (
        <EmptyState
          icon={<LuFiles color="var(--chakra-colors-neutral-400)" />}
          title="Aucun document"
          description="Vos documents récents apparaîtront ici"
        />
      )}
    </Box>
  );

  const handleViewClick = (url?: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const handleEditClick = (document: Document) => {
    setEditingDocument(document);
  };

  const handleDeleteClick = (document: Document) => {
    setDeletingDocument(document);
  };

  const renderDocumentsTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Nom du fichier</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Date d'expiration</TableHead>
          <TableHead>Tags</TableHead>
          <TableHead textAlign="end">Taille</TableHead>
          <TableHead textAlign="end">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents.map((document) => (
          <TableRow 
            key={document.id} 
            _hover={{ bg: "bg.subtle" }}
          >
            <TableCell>
              <Box color="fg.muted">
                <DocumentIcon type={document.type} />
              </Box>
            </TableCell>
            <TableCell fontWeight="medium">{document.name}</TableCell>
            <TableCell>
              <DocumentStatusBadge status={document.status} />
            </TableCell>
            <TableCell color="fg.muted">
              {formatDate(document.expirationDate)}
            </TableCell>
            <TableCell>
              <HStack gap={2}>
                {document.tags && document.tags.length > 0 ? (
                  document.tags.map((tag, index) => (
                    <Badge key={index} variant="subtle" colorScheme="neutral">
                      {tag}
                    </Badge>
                  ))
                ) : (
                  <Text color="fg.muted" fontSize="sm">--</Text>
                )}
              </HStack>
            </TableCell>
            <TableCell textAlign="end" color="fg.muted">
              {formatSize(document.size)}
            </TableCell>
            <TableCell textAlign="end">
              <HStack gap={1} justify="flex-end">
                <IconButton
                  aria-label="Voir le document"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleViewClick(document.url)}
                  disabled={!document.url}
                >
                  <LuEye />
                </IconButton>
                <IconButton
                  aria-label="Modifier le document"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditClick(document)}
                >
                  <LuPencil />
                </IconButton>
                <IconButton
                  aria-label="Supprimer le document"
                  variant="ghost"
                  size="sm"
                  colorPalette="red"
                  onClick={() => handleDeleteClick(document)}
                >
                  <LuTrash />
                </IconButton>
              </HStack>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <>
      <Card>
        <CardHeader>
          <Flex justifyContent="space-between" alignItems="center" width="full">
            <Flex gap="3" alignItems="center">
              <LuFiles size={24} color="var(--chakra-colors-neutral-400)" />
              <Text fontSize="lg" fontWeight="semibold" color="text.fg">
                Documents récents
              </Text>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          {documents.length === 0 ? renderEmptyState() : renderDocumentsTable()}
        </CardBody>
        {documents.length > 0 && (
          <CardFooter>
            <Button variant="ghost" size="sm" onClick={onViewAll}>
              Voir tout
            </Button>
          </CardFooter>
        )}
      </Card>
      
      {editingDocument && (
        <EditDocumentDialog 
          isOpen={!!editingDocument} 
          onClose={() => setEditingDocument(null)} 
          document={editingDocument} 
        />
      )}

      {deletingDocument && (
        <DeleteDocumentDialog
          isOpen={!!deletingDocument}
          onClose={() => setDeletingDocument(null)}
          documentId={deletingDocument.id}
          documentName={deletingDocument.name || deletingDocument.nomFichier || "Document"}
        />
      )}
    </>
  );
}
