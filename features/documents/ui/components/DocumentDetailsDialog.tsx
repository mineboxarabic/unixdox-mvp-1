import {
  Box,
  Flex,
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
import { LuExternalLink, LuPencil, LuTrash, LuFile, LuCalendar, LuHardDrive, LuTag } from "react-icons/lu";
import { DocumentIcon } from "@/shared/components/documents/DocumentIcon";
import { DocumentStatusBadge } from "@/shared/components/documents/DocumentStatusBadge";
import { formatDate } from "@/shared/utils/date";

interface DocumentDetails {
  id: string;
  name: string;
  type: string;
  url?: string;
  size?: number;
  status: string;
  tags?: string[];
  expirationDate?: Date | null;
  nomFichier?: string;
}

interface DocumentDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  document: DocumentDetails;
  onEdit: () => void;
  onDelete: () => void;
}

export function DocumentDetailsDialog({
  isOpen,
  onClose,
  document,
  onEdit,
  onDelete,
}: DocumentDetailsDialogProps) {
  if (!document) return null;

  const formatSize = (bytes?: number) => {
    if (!bytes) return "--";
    const sizes = ['Bytes', 'Kb', 'Mb', 'Gb', 'Tb'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
    return Math.round(bytes / Math.pow(1024, i)) + '' + sizes[i];
  };

  const getPreviewUrl = (url?: string) => {
    if (!url) return null;
    // Convert Google Drive view URL to preview URL if necessary
    if (url.includes("drive.google.com") && url.includes("/view")) {
      return url.replace("/view", "/preview");
    }
    return url;
  };

  const previewUrl = getPreviewUrl(document.url);
  const displayName = document.name || document.nomFichier || "Document sans nom";

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose} size="xl">
      <DialogContent>
        <DialogHeader>
          <DialogTitle display="flex" alignItems="center" gap={2}>
            <DocumentIcon type={document.type} />
            <Text truncate>{displayName}</Text>
          </DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>

        <DialogBody>
          <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={6}>
            {/* Preview Section */}
            <Box
              bg="gray.100"
              borderRadius="md"
              overflow="hidden"
              minH="400px"
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
                  style={{ minHeight: "400px", border: "none" }}
                  title="Document Preview"
                />
              ) : (
                <VStack color="gray.500">
                  <Icon as={LuFile} boxSize={12} />
                  <Text>Aperçu non disponible</Text>
                </VStack>
              )}
            </Box>

            {/* Details Section */}
            <VStack align="stretch" gap={4}>
              <Box>
                <Text fontSize="sm" color="gray.500" mb={1}>Statut</Text>
                <DocumentStatusBadge status={document.status} />
              </Box>

              <Box>
                <Text fontSize="sm" color="gray.500" mb={1} display="flex" alignItems="center" gap={1}>
                  <Icon as={LuHardDrive} /> Taille
                </Text>
                <Text fontWeight="medium">{formatSize(document.size)}</Text>
              </Box>

              <Box>
                <Text fontSize="sm" color="gray.500" mb={1} display="flex" alignItems="center" gap={1}>
                  <Icon as={LuCalendar} /> Date d'expiration
                </Text>
                <Text fontWeight="medium">
                  {document.expirationDate ? formatDate(document.expirationDate) : "Aucune"}
                </Text>
              </Box>

              <Box>
                <Text fontSize="sm" color="gray.500" mb={1} display="flex" alignItems="center" gap={1}>
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

        <DialogFooter>
          {document.url && (
            <Button variant="outline" asChild>
              <Link href={document.url} target="_blank" rel="noopener noreferrer">
                <LuExternalLink /> Ouvrir dans Drive
              </Link>
            </Button>
          )}
          <Button variant="outline" onClick={onEdit}>
            <LuPencil /> Modifier
          </Button>
          <Button colorPalette="red" onClick={onDelete}>
            <LuTrash /> Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
