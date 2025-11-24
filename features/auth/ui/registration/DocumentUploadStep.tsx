'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { VStack, Heading, Text, Box, HStack } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';
import { StepComponentProps } from './types';
import { uploadDocumentFile } from '@/features/documents/actions';
import { toaster } from '@/components/ui/toaster';

// Upload Icon SVG component
function UploadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path 
        d="M12 15V3M12 3L8 7M12 3L16 7" 
        stroke="currentColor" 
        strokeWidth="2"
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M3 15V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V15" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DocumentUploadStep({ onNext, onBack }: StepComponentProps) {
  const router = useRouter();
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    document.getElementById('file-upload')?.click();
  };

  const handleSkip = () => {
    console.log('Skip upload clicked');
    onNext();
  };

  const handleContinue = async () => {
    if (uploadedFile) {
      const formData = new FormData();
      formData.append('file', uploadedFile);

      try {
        const result = await uploadDocumentFile(formData);
        if (result.success) {
          // Redirect to main page after successful upload
          router.push('/');
        } else {
          toaster.create({
            title: 'Erreur',
            description: result.error || "Erreur lors de l'upload",
            type: 'error',
          });
        }
      } catch (error) {
        toaster.create({
          title: 'Erreur',
          description: "Erreur lors de l'upload",
          type: 'error',
        });
      }
    }
  };

  return (
    <VStack
      w="513px"
      flex="1"
      justify="center"
      align="flex-start"
      gap={6}
      overflow="hidden"
    >
      <VStack align="flex-start" gap={4}>
        <Heading
          as="h1"
          fontSize="xl"
          fontWeight="normal"
          color="text.fg"
          lineHeight="1.5"
        >
          Tout est prêt !
        </Heading>
        <Text
          fontSize="sm"
          fontWeight="normal"
          color="text.fg.muted"
          lineHeight="1.6"
        >
          Vous êtes prêt à simplifier votre vie administrative, commencez par importer vos premiers documents et laissez Unidox se charger du reste.
        </Text>
      </VStack>

      {/* Upload Area */}
      <Box
        w="full"
        position="relative"
        border="2px dashed"
        borderColor={dragActive ? "primary.500" : "border.default"}
        borderRadius="lg"
        bg={dragActive ? "bg.muted" : "transparent"}
        transition="all 0.2s"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <VStack py={8} px={4} gap={4} align="center">
          <Box color={dragActive ? "primary.500" : "text.fg.muted"}>
            <UploadIcon />
          </Box>
          
          <VStack gap={1} align="center">
            <Text
              fontSize="sm"
              fontWeight="normal"
              color="text.fg"
              textAlign="center"
            >
              Glissez des documents ici
            </Text>
            <Text
              fontSize="sm"
              fontWeight="normal"
              color="text.fg.muted"
              textAlign="center"
            >
              ou
            </Text>
          </VStack>

          <input
            id="file-upload"
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />

          <Button
            size="sm"
            variant="solid"
            colorPalette="blue"
            onClick={handleUploadClick}
          >
            Cliquez pour importer votre premier document
          </Button>

          {uploadedFile && (
            <Box
              mt={2}
              px={3}
              py={2}
              bg="bg.muted"
              borderRadius="md"
              w="full"
            >
              <Text fontSize="xs" color="text.fg" lineClamp={1}>
                📄 {uploadedFile.name}
              </Text>
            </Box>
          )}
        </VStack>
      </Box>

      {/* Action Buttons */}
      <HStack w="full" gap={3} justify="space-between">
        <Button
          size="md"
          variant="outline"
          colorPalette="gray"
          flex="1"
          onClick={onBack}
        >
          Retour
        </Button>

        <Button
          size="md"
          variant="outline"
          colorPalette="gray"
          flex="1"
          onClick={handleSkip}
        >
          Passer cette étape
        </Button>

        {uploadedFile && (
          <Button
            size="md"
            variant="solid"
            colorPalette="gray"
            flex="1"
            onClick={handleContinue}
          >
            Continuer
          </Button>
        )}
      </HStack>
    </VStack>
  );
}
