"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { LuCloudUpload } from "react-icons/lu";
import { Button } from "./button";

export interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
}

export function FileUpload({
  onFileSelect,
  accept,
  multiple = false,
  maxSize,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      onFileSelect(files);
    },
    [onFileSelect]
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files ? Array.from(e.target.files) : [];
      onFileSelect(files);
    },
    [onFileSelect]
  );

  return (
    <Box
      position="relative"
      width="full"
      height="223px"
      border="2px dashed"
      borderColor={isDragging ? "primary.500" : "border.default"}
      borderRadius="lg"
      bg={isDragging ? "primary.50" : "bg.surface"}
      transition="all 0.2s"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        height="full"
        gap="4"
        px="4"
      >
        <Box color="primary.100" fontSize="5xl">
          <LuCloudUpload />
        </Box>
        <Flex direction="column" align="center" gap="3">
          <Text fontSize="sm" color="text.fg.muted" textAlign="center">
            Glissez des documents ici ou
          </Text>
          <Button
            size="md"
            variant="solid"
            colorScheme="primary"
            onClick={() => document.getElementById("file-input")?.click()}
          >
            Parcourir les fichiers
          </Button>
        </Flex>
      </Flex>
      <input
        id="file-input"
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileInputChange}
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          opacity: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}
