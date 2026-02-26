"use client";

import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { Input } from "@/shared/components/ui";
import { Button } from "@/shared/components/ui/button";
import { LuSearch, LuFilePlus, LuFolderOpen, LuShield } from "react-icons/lu";
import { UpcomingDeadlinesCard } from "../components/UpcomingDeadlinesCard";
import { RecentDocumentsCard } from "../components/RecentDocumentsCard";
import { RecentDemarchesCard } from "../components/RecentDemarchesCard";
import type { HomeData } from "../../types";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { ProcessingState } from "@/shared/components/documents/ProcessingState";
import { SearchDropdown } from "@/features/search";
import { getSearchData } from "@/features/search/actions";
import type { SearchData, SearchDocument } from "@/features/search/types";
import { useRouter } from "next/navigation";
import { DocumentViewDialog } from "@/features/documents/ui/components/DocumentViewDialog";

export interface HomePageProps {
  data: HomeData;
  userRole?: string;
  onCreateProcedure?: () => void;
  onCreateDossier?: () => void;
  onViewAllProcedures?: () => void;
  onViewAllDeadlines?: () => void;
  onViewAllDocuments?: () => void;
  onUpgradeToPremium?: () => void;
  onFileUpload?: (files: File[]) => void;
  uploadDocumentsAction?: (formData: FormData) => Promise<void>;
  onRenewDocument?: (documentId?: string) => void;
}

export function HomePage({
  data,
  userRole,
  onCreateProcedure,
  onCreateDossier,
  onViewAllProcedures,
  onViewAllDeadlines,
  onViewAllDocuments,
  onUpgradeToPremium,
  onFileUpload,
  uploadDocumentsAction,
  onRenewDocument,
}: HomePageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchData, setSearchData] = useState<SearchData | null>(null);
  const [searchPosition, setSearchPosition] = useState({ top: 0, left: 0, width: 0 });
  const [viewingDocument, setViewingDocument] = useState<SearchDocument | null>(null);
  const router = useRouter();

  const handleFileUpload = async (files: File[]) => {
    setIsProcessing(true);
    try {
      if (onFileUpload) {
        onFileUpload(files);
        return;
      }

      if (uploadDocumentsAction) {
        const formData = new FormData();
        files.forEach((file) => formData.append("files", file));
        await uploadDocumentsAction(formData);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const onHeaderUploadClick = () => {
    fileInputRef.current?.click();
  };

  const onHeaderFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(Array.from(e.target.files));
      // Reset input so same file can be selected again if needed
      e.target.value = "";
    }
  };

  const handleSearchFocus = async () => {
    if (searchInputRef.current) {
      const rect = searchInputRef.current.getBoundingClientRect();
      setSearchPosition({
        top: rect.bottom + 8,
        left: rect.left,
        width: rect.width,
      });
    }

    if (!searchData) {
      const data = await getSearchData();
      setSearchData(data);
    }

    setSearchOpen(true);
  };

  const handleSearchBlur = () => {
    // Delay to allow click events on dropdown items
    setTimeout(() => {
      setSearchOpen(false);
    }, 200);
  };

  const handleDocumentClick = (documentId: string) => {
    setSearchOpen(false);
    // Open the document details dialog directly without navigating away
    const doc = searchData?.documents.find((d) => d.id === documentId) ?? null;
    setViewingDocument(doc);
  };

  const handleDemarcheClick = (demarcheId: string) => {
    setSearchOpen(false);
    // Navigate to demarche (adjust route as needed)
    router.push(`/demarches/${demarcheId}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node) &&
        searchOpen
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOpen]);

  return (
    <Box minH="100vh" bg="bg.canvas">
      <ProcessingState isOpen={isProcessing} onOpenChange={(e) => setIsProcessing(e.open)} />

      {/* Hidden file input for document upload */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={onHeaderFileChange}
        multiple
      />

      {/* Content wrapper — centered with consistent spacing */}
      <Flex direction="column" gap="6" px="6" alignItems="center">
        {/* Head section — welcome title, search bar, action buttons */}
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          gap="5"
          py="12"
          w="full"
          maxW="1200px"
        >
          <Text fontSize="4xl" fontWeight="medium" color="gray.600">
            Bienvenue sur Unidox
          </Text>

          {/* Search Input — pill-shaped, constrained width */}
          <Box position="relative" w="388px">
            <Box
              position="absolute"
              left="3"
              top="50%"
              transform="translateY(-50%)"
              color="gray.400"
              zIndex="1"
            >
              <LuSearch size={18} />
            </Box>
            <Input
              ref={searchInputRef}
              placeholder="Recherchez un fichier, une démarche..."
              style={{ paddingLeft: "2.5rem" }}
              size="md"
              width="full"
              borderRadius="full"
              bg="white"
              borderColor="neutral.200"
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
            />
          </Box>

          {/* Search Dropdown */}
          <SearchDropdown
            isOpen={searchOpen}
            documents={searchData?.documents || []}
            demarches={searchData?.demarches || []}
            onDocumentClick={handleDocumentClick}
            onDemarcheClick={handleDemarcheClick}
            position={searchPosition}
          />

          {/* Read-only document view — opened when clicking a search result */}
          {viewingDocument && (
            <DocumentViewDialog
              isOpen={true}
              onClose={() => setViewingDocument(null)}
              document={{
                id: viewingDocument.id,
                name: viewingDocument.nomFichier,
                type: viewingDocument.type,
                status: viewingDocument.statut,
                url: viewingDocument.urlStockage,
                size: viewingDocument.size,
                tags: viewingDocument.tags,
                expirationDate: viewingDocument.dateExpiration,
              }}
            />
          )}

          {/* Action Buttons — subtle filled + outline styles */}
          <Flex gap="2">
            <Button
              size="sm"
              h="36px"
              bg="primary.100"
              color="primary.900"
              border="1px solid"
              borderColor="primary.200"
              borderRadius="full"
              _hover={{ bg: "primary.200" }}
              onClick={onHeaderUploadClick}
            >
              <LuFilePlus size={16} />
              Ajouter un document
            </Button>
            <Button
              size="sm"
              h="36px"
              variant="outline"
              color="primary.900"
              borderColor="primary.200"
              borderRadius="full"
              _hover={{ bg: "primary.50" }}
              onClick={onCreateProcedure}
            >
              <LuFolderOpen size={16} />
              Commencer une démarche
            </Button>

            {(userRole === "ADMIN" || userRole === "MANAGER") && (
              <Link href="/admin/modele-demarche">
                <Button
                  size="sm"
                  h="36px"
                  bg="purple.50"
                  color="purple.600"
                  borderRadius="full"
                  _hover={{ bg: "purple.100" }}
                >
                  <LuShield size={16} />
                  Panneau Admin
                </Button>
              </Link>
            )}
          </Flex>
        </Flex>

        {/* Cards section — constrained to 1200px */}
        <Box w="full" maxW="1200px">
          <Grid
            templateColumns={{
              base: "1fr",
              lg: "repeat(2, 1fr)",
            }}
            gap="4"
          >
            {/* Left card — Dossiers récents */}
            <RecentDemarchesCard
              demarches={data.recentDemarches}
              onViewAll={onViewAllProcedures}
              onCreateDemarche={onCreateProcedure}
              onViewDetail={(id) => router.push(`/demarches/${id}`)}
            />

            {/* Right card — Échéances à venir */}
            <UpcomingDeadlinesCard
              deadlines={data.upcomingDeadlines}
              isPremiumUser={data.isPremiumUser}
              onViewAll={onViewAllDeadlines}
              onUpgrade={onUpgradeToPremium}
              onRenew={onRenewDocument}
            />

            {/* Full-width card — Documents récents */}
            <Box gridColumn={{ lg: "span 2" }}>
              <RecentDocumentsCard
                documents={data.recentDocuments}
                onViewAll={onViewAllDocuments}
                onFileUpload={handleFileUpload}
              />
            </Box>
          </Grid>
        </Box>
      </Flex>
    </Box>
  );
}
