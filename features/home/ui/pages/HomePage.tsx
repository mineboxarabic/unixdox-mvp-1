"use client";

import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { Input } from "@/shared/components/ui";
import { Button } from "@/shared/components/ui/button";
import { LuPlus, LuSearch, LuFilePlus, LuFolderPlus, LuShield } from "react-icons/lu";
import { RecentProceduresCard } from "../components/RecentProceduresCard";
import { UpcomingDeadlinesCard } from "../components/UpcomingDeadlinesCard";
import { RecentDocumentsCard } from "../components/RecentDocumentsCard";
import { RecentDemarchesCard } from "../components/RecentDemarchesCard";
import type { HomeData } from "../../types";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { ProcessingState } from "@/shared/components/documents/ProcessingState";
import { SearchDropdown } from "@/features/search";
import { getSearchData } from "@/features/search/actions";
import type { SearchData } from "@/features/search/types";
import { useRouter } from "next/navigation";

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
}: HomePageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchData, setSearchData] = useState<SearchData | null>(null);
  const [searchPosition, setSearchPosition] = useState({ top: 0, left: 0, width: 0 });
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
    // Navigate to document (adjust route as needed)
    router.push(`/documents?id=${documentId}`);
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
    <Box minH="100vh" bg="bg.canvas" p="6">
      <ProcessingState isOpen={isProcessing} onOpenChange={(e) => setIsProcessing(e.open)} />

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={onHeaderFileChange}
        multiple
      />
      <Box maxW="1400px" mx="auto">
        {/* Header */}
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          gap="6"
          mb="10"
        >
          <Text fontSize="4xl" fontWeight="bold" color="neutral.900">
            Bienvenue sur Unidox
          </Text>

          {/* Search Input */}
          <Box position="relative" width="full" maxW="750px">
            <Box
              position="absolute"
              left="3"
              top="50%"
              transform="translateY(-50%)"
              color="text.fg.subtle"
              zIndex="1"
            >
              <LuSearch size={18} />
            </Box>
            <Input
              ref={searchInputRef}
              placeholder="Recherchez un fichier, une démarche..."
              style={{ paddingLeft: "2.5rem", backgroundColor: "var(--chakra-colors-bg-surface)" }}
              size="lg"
              width="full"
              borderRadius="full"
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

          {/* Action Buttons */}
          <Flex gap="4">
            <Button
              size="md"
              bg="primary.50"
              color="primary.600"
              _hover={{ bg: "primary.100" }}
              onClick={onHeaderUploadClick}
              leftIcon={<LuFilePlus size={18} />}
            >
              Ajouter un document
            </Button>
            <Button
              size="md"
              bg="primary.50"
              color="primary.600"
              _hover={{ bg: "primary.100" }}
              onClick={onCreateProcedure}
              leftIcon={<LuFolderPlus size={18} />}
            >
              Commencer une démarche
            </Button>

            {(userRole === "ADMIN" || userRole === "MANAGER") && (
              <Link href="/admin/modele-demarche">
                <Button
                  size="md"
                  bg="purple.50"
                  color="purple.600"
                  _hover={{ bg: "purple.100" }}
                  leftIcon={<LuShield size={18} />}
                >
                  Admin Panel
                </Button>
              </Link>
            )}
          </Flex>
        </Flex>

        {/* Grid Layout */}
        <Grid
          templateColumns={{
            base: "1fr",
            lg: "repeat(2, 1fr)",
          }}
          gap="6"
        >
          <RecentDemarchesCard
            demarches={data.recentDemarches}
            automaticDemarchesCount={data.automaticDemarchesCount}
            automaticDemarchesTotal={data.automaticDemarchesTotal}
            onViewAll={onViewAllProcedures}
            onCreateDemarche={onCreateProcedure}
            onViewDetail={(id) => router.push(`/demarches/${id}`)}
          />

          <UpcomingDeadlinesCard
            deadlines={data.upcomingDeadlines}
            isPremiumUser={data.isPremiumUser}
            onViewAll={onViewAllDeadlines}
            onUpgrade={onUpgradeToPremium}
          />

          <Box gridColumn={{ lg: "span 2" }}>
            <RecentDocumentsCard
              documents={data.recentDocuments}
              onViewAll={onViewAllDocuments}
              onFileUpload={handleFileUpload}
            />
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
