"use client";

import {
  Box,
  Grid,
  HStack,
  Text,
  VStack,
  Icon,
  Link,
  Badge,
} from "@chakra-ui/react";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogCloseTrigger,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { LuExternalLink, LuFile, LuCalendar, LuHardDrive, LuTag } from "react-icons/lu";
import { DocumentIcon } from "@/shared/components/documents/DocumentIcon";
import { DocumentStatusBadge } from "@/shared/components/documents/DocumentStatusBadge";
import { formatDate } from "@/shared/utils/date";
import { formatSize } from "@/shared/utils/format";
import { getDrivePreviewUrl } from "../../utils";

/** Minimal document data needed for a read-only view */
export interface ViewableDocument {
  id: string;
  name: string;
  type: string;
  url?: string | null;
  size?: number;
  status: string;
  tags?: string[];
  expirationDate?: Date | null;
}

interface DocumentViewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  document: ViewableDocument;
}

/**
 * A lightweight, read-only dialog to preview a document.
 * Used when clicking search results — does not expose edit/delete actions.
 */
export function DocumentViewDialog({
  isOpen,
  onClose,
  document,
}: DocumentViewDialogProps) {
  if (!document) return null;

  const previewUrl = getDrivePreviewUrl(document.url ?? undefined);

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose} size="xl">
      <DialogContent>
        <DialogHeader>
          <DialogTitle display="flex" alignItems="center" gap={2}>
            <DocumentIcon type={document.type} />
            <Text truncate>{document.name}</Text>
          </DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>

        <DialogBody>
          <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={6}>
            {/* Preview Section */}
            <Box
              bg="gray.50"
              borderRadius="md"
              overflow="hidden"
              minH="360px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="1px solid"
              borderColor="gray.200"
            >
              {previewUrl ? (
                <iframe
                  src={previewUrl}
                  width="100%"
                  height="100%"
                  style={{ minHeight: "360px", border: "none" }}
                  title={`Aperçu de ${document.name}`}
                />
              ) : (
                <VStack color="gray.400">
                  <Icon as={LuFile} boxSize={12} />
                  <Text fontSize="sm">Aperçu non disponible</Text>
                </VStack>
              )}
            </Box>

            {/* Meta Section */}
            <VStack align="stretch" gap={5}>
              {/* Status */}
              <Box>
                <Text fontSize="xs" fontWeight="medium" color="gray.500" mb={1} textTransform="uppercase" letterSpacing="wider">
                  Statut
                </Text>
                <DocumentStatusBadge status={document.status} />
              </Box>

              {/* Size */}
              <Box>
                <Text fontSize="xs" fontWeight="medium" color="gray.500" mb={1} display="flex" alignItems="center" gap={1} textTransform="uppercase" letterSpacing="wider">
                  <Icon as={LuHardDrive} /> Taille
                </Text>
                <Text fontSize="sm" fontWeight="medium">{formatSize(document.size)}</Text>
              </Box>

              {/* Expiration Date */}
              <Box>
                <Text fontSize="xs" fontWeight="medium" color="gray.500" mb={1} display="flex" alignItems="center" gap={1} textTransform="uppercase" letterSpacing="wider">
                  <Icon as={LuCalendar} /> Date d&apos;expiration
                </Text>
                <Text fontSize="sm" fontWeight="medium">
                  {document.expirationDate ? formatDate(document.expirationDate) : "Aucune"}
                </Text>
              </Box>

              {/* Tags */}
              <Box>
                <Text fontSize="xs" fontWeight="medium" color="gray.500" mb={2} display="flex" alignItems="center" gap={1} textTransform="uppercase" letterSpacing="wider">
                  <Icon as={LuTag} /> Tags
                </Text>
                <HStack wrap="wrap" gap={2}>
                  {document.tags && document.tags.length > 0 ? (
                    document.tags.map((tag, index) => (
                      <Badge key={index} variant="subtle" colorScheme="blue">
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <Text fontSize="sm" color="gray.400">Aucun tag</Text>
                  )}
                </HStack>
              </Box>
            </VStack>
          </Grid>
        </DialogBody>

        <DialogFooter justifyContent="flex-end">
          {document.url && (
            <Button variant="outline" asChild>
              <Link href={document.url} target="_blank" rel="noopener noreferrer">
                <LuExternalLink /> Ouvrir dans Drive
              </Link>
            </Button>
          )}
          <Button variant="ghost" onClick={onClose}>
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
