'use client';

import { Box, Flex, Text, VStack, HStack, Icon } from '@chakra-ui/react';
import { 
  DialogHeader, 
  DialogBody, 
  DialogFooter, 
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import {
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValueText,
} from '@/shared/components/ui/select';
import { LuX, LuRefreshCw, LuCheck, LuInfo, LuFileText } from 'react-icons/lu';
import type { ListCollection } from '@chakra-ui/react';

interface MatchedDocument {
  requirement: string;
  document: { id: string; nomFichier: string; type: string } | null;
  isReplacement: boolean;
  replacementReason?: string;
}

// Generic document item for the collection - accepts any type field
interface DocumentItem {
  label: string;
  value: string;
  type: string;
}

interface ReviewStepProps {
  modeleTitre: string;
  matchedDocuments: MatchedDocument[];
  selectedDocumentsCount: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  documentsCollection: ListCollection<any>;
  onRemoveDocument: (requirement: string) => void;
  onChangeDocument: (requirement: string, docId: string) => void;
  onBack: () => void;
  onClose: () => void;
  onSubmit: () => void;
}

export function ReviewStep({
  modeleTitre,
  matchedDocuments,
  selectedDocumentsCount,
  documentsCollection,
  onRemoveDocument,
  onChangeDocument,
  onBack,
  onClose,
  onSubmit,
}: ReviewStepProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Création du dossier pour {modeleTitre}</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <VStack gap={6} align="stretch">
          <Box bg="bg.subtle" p={4} borderRadius="md">
            <Text fontSize="sm" color="fg.muted">
              Vérifiez les documents sélectionnés pour votre démarche. L'IA a pré-rempli les documents correspondants.
              Vous pouvez modifier la sélection manuellement si nécessaire.
            </Text>
          </Box>
          
          {/* Documents list with selectors */}
          <VStack gap={3} align="stretch">
            {matchedDocuments.map((item) => (
              <DocumentRequirementCard
                key={item.requirement}
                item={item}
                documentsCollection={documentsCollection}
                onRemove={() => onRemoveDocument(item.requirement)}
                onChange={(docId) => onChangeDocument(item.requirement, docId)}
              />
            ))}
          </VStack>
          
          {/* Summary */}
          <Box pt={4} borderTop="1px solid" borderColor="border.muted">
            <HStack justify="space-between">
              <HStack>
                <Icon as={LuFileText} color="fg.muted" />
                <Text fontSize="sm" color="fg.muted">
                  Documents sélectionnés
                </Text>
              </HStack>
              <Badge 
                size="md" 
                colorScheme={selectedDocumentsCount === matchedDocuments.length ? "success" : "warning"}
              >
                {selectedDocumentsCount} / {matchedDocuments.length}
              </Badge>
            </HStack>
          </Box>
        </VStack>
      </DialogBody>
      <DialogFooter>
        <Flex gap={3} justify="space-between" w="full">
          <Button
            variant="ghost"
            onClick={onBack}
          >
            <Icon as={LuRefreshCw} mr={2} />
            Changer de modèle
          </Button>
          <HStack gap={3}>
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button 
              colorPalette="blue" 
              onClick={onSubmit}
              disabled={selectedDocumentsCount === 0}
            >
              Créer la démarche
            </Button>
          </HStack>
        </Flex>
      </DialogFooter>
    </>
  );
}

// Sub-component for each document requirement card
interface DocumentRequirementCardProps {
  item: MatchedDocument;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  documentsCollection: ListCollection<any>;
  onRemove: () => void;
  onChange: (docId: string) => void;
}

function DocumentRequirementCard({
  item,
  documentsCollection,
  onRemove,
  onChange,
}: DocumentRequirementCardProps) {
  // Determine status and styling
  const isExactMatch = item.document?.type === item.requirement;
  const isManualMismatch = item.document && !isExactMatch && !item.isReplacement;
  const isMissing = !item.document;

  let statusColor = "gray.200";
  let borderColor = "border.default";
  let StatusIcon = LuCheck;
  let statusText = "";

  if (isMissing) {
    statusColor = "red.100";
    borderColor = "red.200";
    StatusIcon = LuX;
    statusText = "Document manquant";
  } else if (item.isReplacement) {
    statusColor = "orange.100";
    borderColor = "orange.200";
    StatusIcon = LuInfo;
    statusText = "Suggestion IA";
  } else if (isManualMismatch) {
    statusColor = "yellow.100";
    borderColor = "yellow.200";
    StatusIcon = LuInfo;
    statusText = "Type différent";
  } else {
    statusColor = "green.100";
    borderColor = "green.200";
    StatusIcon = LuCheck;
    statusText = "Validé";
  }

  return (
    <Box
      p={4}
      bg="bg.panel"
      borderRadius="lg"
      border="1px solid"
      borderColor={borderColor}
      position="relative"
      transition="all 0.2s"
      _hover={{ borderColor: "border.emphasized", shadow: "sm" }}
    >
      <Flex gap={4} align="start">
        {/* Status Icon */}
        <Box 
          p={2} 
          bg={statusColor} 
          borderRadius="full" 
          color={isMissing ? "red.600" : item.isReplacement ? "orange.600" : isManualMismatch ? "yellow.600" : "green.600"}
        >
          <Icon as={StatusIcon} boxSize={5} />
        </Box>

        <Box flex={1}>
          {/* Header */}
          <Flex justify="space-between" align="center" mb={2}>
            <VStack align="start" gap={0}>
              <Text fontWeight="semibold" color="fg.default">
                {item.requirement}
              </Text>
              <Text fontSize="xs" color={isMissing ? "red.500" : "fg.muted"}>
                {statusText}
              </Text>
            </VStack>
            
            {item.document && (
              <Button 
                size="xs" 
                variant="ghost" 
                colorPalette="red" 
                onClick={onRemove}
                aria-label="Retirer le document"
              >
                <Icon as={LuX} />
              </Button>
            )}
          </Flex>

          {/* Selector */}
          <SelectRoot
            collection={documentsCollection}
            value={item.document ? [item.document.id] : []}
            onValueChange={(e) => {
              const newValue = e.value[0];
              if (newValue) {
                onChange(newValue);
              }
            }}
            size="sm"
          >
            <SelectTrigger>
              <SelectValueText placeholder="Sélectionner un document..." />
            </SelectTrigger>
            <SelectContent>
              {documentsCollection.items.map((doc) => (
                <SelectItem key={doc.value} item={doc}>
                  <HStack justify="space-between" w="full">
                    <Text fontSize="sm" truncate maxW="200px">{doc.label}</Text>
                    <Badge size="sm" variant="subtle">
                      {doc.type}
                    </Badge>
                  </HStack>
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>

          {/* Feedback Messages */}
          {item.isReplacement && item.replacementReason && (
            <Flex mt={2} gap={2} align="center" bg="orange.50" p={2} borderRadius="md">
              <Icon as={LuInfo} color="orange.500" boxSize="12px" />
              <Text fontSize="xs" color="orange.700">
                {item.replacementReason}
              </Text>
            </Flex>
          )}

          {isManualMismatch && (
            <Flex mt={2} gap={2} align="center" bg="yellow.50" p={2} borderRadius="md">
              <Icon as={LuInfo} color="yellow.500" boxSize="12px" />
              <Text fontSize="xs" color="yellow.700">
                Le type du document ({item.document?.type}) ne correspond pas exactement au requis ({item.requirement}).
              </Text>
            </Flex>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
