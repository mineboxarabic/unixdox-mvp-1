"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  EmptyState,
  FileUpload,
  Separator,
} from "@/shared/components/ui";
import { Button } from "@/shared/components/ui/button";
import { LuFiles } from "react-icons/lu";
import type { Document } from "../../types";

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
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  const getFileExtension = (filename: string) => {
    const parts = filename.split(".");
    return parts.length > 1 ? parts.pop()?.toUpperCase() : "FILE";
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

  const renderDocumentsList = () => (
    <Flex direction="column" gap="0">
      {documents.map((document, index) => {
        const extension = getFileExtension(document.name);
        return (
          <Box key={document.id}>
            <Flex py="3" alignItems="center" gap="3">
              <Flex
                alignItems="center"
                justifyContent="center"
                w="40px"
                h="40px"
                bg="primary.50"
                borderRadius="md"
              >
                <LuFiles size={20} color="var(--chakra-colors-primary-600)" />
              </Flex>
              <Flex direction="column" gap="1" flex="1" minW="0">
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  color="text.fg"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  {document.name}
                </Text>
                <Text fontSize="xs" color="text.fg.muted">
                  {formatDate(document.uploadedAt)}
                </Text>
              </Flex>
              <Badge colorScheme="neutral" variant="subtle" size="sm">
                {extension}
              </Badge>
            </Flex>
            {index < documents.length - 1 && <Separator />}
          </Box>
        );
      })}
    </Flex>
  );

  return (
    <Card>
      <CardHeader>
        <Flex justifyContent="space-between" alignItems="center" width="full">
          <Flex gap="3" alignItems="center">
            <LuFiles size={24} color="var(--chakra-colors-neutral-400)" />
            <Text fontSize="lg" fontWeight="semibold" color="text.fg">
              Documents récents
            </Text>
          </Flex>
          <Flex gap="1" fontSize="sm" color="text.fg.muted">
            <Text>Fichiers triés automatiquement ce mois ci :</Text>
            <Text fontWeight="medium" color="text.fg">
              0/5
            </Text>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        {documents.length === 0 ? renderEmptyState() : renderDocumentsList()}
      </CardBody>
      {documents.length > 0 && (
        <CardFooter>
          <Button variant="ghost" size="sm" onClick={onViewAll}>
            Voir tout
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
