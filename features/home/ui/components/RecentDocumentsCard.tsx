"use client";

import { Box, Flex, Text, HStack } from "@chakra-ui/react";
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
import { LuFiles, LuFileText, LuImage, LuFile, LuCreditCard, LuBriefcase, LuDollarSign } from "react-icons/lu";
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
  const formatDate = (date: Date | null | undefined) => {
    if (!date) return "--/--/----";
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(date));
  };

  const formatSize = (bytes?: number) => {
    if (!bytes) return "--";
    const sizes = ['Bytes', 'Kb', 'Mb', 'Gb', 'Tb'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
    return Math.round(bytes / Math.pow(1024, i)) + '' + sizes[i];
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "FACTURE":
      case "FICHE_PAIE":
      case "RELEVE_BANCAIRE":
        return <LuDollarSign />;
      case "CONTRAT":
      case "ATTESTATION_TRAVAIL":
        return <LuBriefcase />;
      case "CARTE_IDENTITE":
      case "PASSEPORT":
      case "PERMIS_CONDUIRE":
      case "CARTE_VITALE":
        return <LuCreditCard />;
      case "JUSTIFICATIF_DOMICILE":
      case "ACTE_NAISSANCE":
      case "ACTE_MARIAGE":
        return <LuFileText />;
      default:
        return <LuFile />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "VERIFIE":
        return <Badge colorScheme="success" variant="subtle">Vérifié</Badge>;
      case "EN_ATTENTE":
        return <Badge colorScheme="warning" variant="subtle">En attente</Badge>;
      case "REFUSE":
        return <Badge colorScheme="danger" variant="subtle">Refusé</Badge>;
      case "EXPIRE":
        return <Badge colorScheme="neutral" variant="subtle">Expiré</Badge>;
      default:
        return <Badge colorScheme="neutral" variant="subtle">{status}</Badge>;
    }
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
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents.map((document) => (
          <TableRow key={document.id}>
            <TableCell>
              <Box color="fg.muted">
                {getDocumentIcon(document.type)}
              </Box>
            </TableCell>
            <TableCell fontWeight="medium">{document.name}</TableCell>
            <TableCell>
              {getStatusBadge(document.status)}
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
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
  );
}
