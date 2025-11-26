"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { LuUpload } from "react-icons/lu";
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
    <>
      <style>
        {`
          @keyframes bounce-upload {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>
      <Box
        position="relative"
        width="full"
        height="223px"
        border="2px dashed"
        borderColor={isDragging ? "primary.500" : "border.default"}
        borderRadius="lg"
        bg={isDragging ? "primary.50" : "bg.surface"}
        transition="all 0.3s ease"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        cursor="pointer"
        onClick={() => document.getElementById("file-input")?.click()}
        _hover={{
          borderColor: "primary.400",
          bg: "primary.25",
          transform: "scale(1.01)",
        }}
      >
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          height="full"
          gap="4"
          px="4"
        >
          <Box
            color={isDragging ? "primary.600" : "text.fg.subtle"}
            fontSize="5xl"
            transition="all 0.3s ease"
            css={isDragging ? { animation: "bounce-upload 0.6s ease infinite" } : undefined}
          >
            <LuUpload />
          </Box>
        <Flex direction="column" align="center" gap="1">
          <Text
            fontSize="sm"
            color={isDragging ? "primary.700" : "text.fg.muted"}
            textAlign="center"
            fontWeight={isDragging ? "semibold" : "normal"}
            transition="all 0.3s ease"
          >
            Glissez des documents ici
          </Text>
          <Text fontSize="sm" color="text.fg.muted" textAlign="center">
            ou
          </Text>
          <Button
            size="md"
            variant="solid"
            colorScheme="primary"
            bg="primary.600"
            color="white"
            _hover={{ bg: "primary.700" }}
            onClick={(e) => {
              e.stopPropagation();
              document.getElementById("file-input")?.click();
            }}
            mt="2"
            borderRadius="full"
            px="6"
          >
            Cliquez ici pour importer un document
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
    </>
  );
}
