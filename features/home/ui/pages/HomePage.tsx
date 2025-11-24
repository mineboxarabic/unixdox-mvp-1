"use client";

import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { Input } from "@/shared/components/ui";
import { Button } from "@/shared/components/ui/button";
import { LuPlus, LuSearch, LuFilePlus, LuFolderPlus } from "react-icons/lu";
import { RecentProceduresCard } from "../components/RecentProceduresCard";
import { UpcomingDeadlinesCard } from "../components/UpcomingDeadlinesCard";
import { RecentDocumentsCard } from "../components/RecentDocumentsCard";
import type { HomeData } from "../../types";

export interface HomePageProps {
  data: HomeData;
  onCreateProcedure?: () => void;
  onCreateDossier?: () => void;
  onViewAllProcedures?: () => void;
  onViewAllDeadlines?: () => void;
  onViewAllDocuments?: () => void;
  onUpgradeToPremium?: () => void;
  onFileUpload?: (files: File[]) => void;
}

export function HomePage({
  data,
  onCreateProcedure,
  onCreateDossier,
  onViewAllProcedures,
  onViewAllDeadlines,
  onViewAllDocuments,
  onUpgradeToPremium,
  onFileUpload,
}: HomePageProps) {
  return (
    <Box minH="100vh" bg="bg.canvas" p="6">
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
              placeholder="Rechercher un fichier, une démarche..."
              style={{ paddingLeft: "2.5rem", backgroundColor: "var(--chakra-colors-bg-surface)" }}
              size="lg"
              width="full"
            />
          </Box>

          {/* Action Buttons */}
          <Flex gap="4">
            <Button
              size="md"
              bg="primary.50"
              color="primary.600"
              _hover={{ bg: "primary.100" }}
              onClick={onFileUpload ? () => onFileUpload([]) : undefined} // Trigger file upload if available
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
          <RecentProceduresCard
            procedures={data.recentProcedures}
            onViewAll={onViewAllProcedures}
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
              onFileUpload={onFileUpload}
            />
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
