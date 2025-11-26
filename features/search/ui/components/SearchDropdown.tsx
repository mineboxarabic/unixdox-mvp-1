"use client";

import { Box, Portal, Text as ChakraText } from "@chakra-ui/react";
import { LuFile, LuFolder, LuArrowRight } from "react-icons/lu";
import { SearchResultItem } from "./SearchResultItem";
import type { SearchDocument, SearchDemarche } from "../../types";

export interface SearchDropdownProps {
  isOpen: boolean;
  documents: SearchDocument[];
  demarches: SearchDemarche[];
  onDocumentClick: (documentId: string) => void;
  onDemarcheClick: (demarcheId: string) => void;
  position: {
    top: number;
    left: number;
    width: number;
  };
}

export function SearchDropdown({
  isOpen,
  documents,
  demarches,
  onDocumentClick,
  onDemarcheClick,
  position,
}: SearchDropdownProps) {
  if (!isOpen) return null;

  return (
    <Portal>
      <Box
        position="fixed"
        top={`${position.top}px`}
        left={`${position.left}px`}
        width={`${position.width}px`}
        bg="bg.surface"
        borderRadius="xl"
        boxShadow="0px 0px 1px 0px rgba(24, 24, 27, 0.3), 0px 8px 16px 0px rgba(24, 24, 27, 0.1)"
        p="1"
        zIndex="dropdown"
        maxH="400px"
        overflowY="auto"
      >
        {/* Documents Section */}
        {documents.length > 0 && (
          <>
            {documents.map((doc) => (
              <SearchResultItem
                key={doc.id}
                icon={<LuFile size={18} color="var(--chakra-colors-neutral-600)" />}
                label={doc.nomFichier}
                onClick={() => onDocumentClick(doc.id)}
              />
            ))}
          </>
        )}

        {/* Separator */}
        {documents.length > 0 && demarches.length > 0 && (
          <Box
            borderTop="0.5px solid"
            borderColor="border.default"
            my="1"
          />
        )}

        {/* Demarches Section */}
        {demarches.length > 0 && (
          <>
            {demarches.map((demarche) => (
              <SearchResultItem
                key={demarche.id}
                icon={<LuFolder size={18} color="var(--chakra-colors-neutral-600)" />}
                label={demarche.titre}
                rightIcon={<LuArrowRight size={18} color="var(--chakra-colors-neutral-600)" />}
                onClick={() => onDemarcheClick(demarche.id)}
              />
            ))}
          </>
        )}

        {/* Empty State */}
        {documents.length === 0 && demarches.length === 0 && (
          <Box px="2" py="3" textAlign="center">
            <ChakraText fontSize="sm" color="text.fg.muted">
              Aucun résultat récent
            </ChakraText>
          </Box>
        )}
      </Box>
    </Portal>
  );
}
