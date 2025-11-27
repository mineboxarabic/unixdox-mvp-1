'use client';

import { useState } from 'react';
import { 
  DialogRoot, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogActionTrigger,
  DialogCloseTrigger 
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { 
  VStack, 
  Text, 
  Box,
  SimpleGrid,
  Input,
  Image
} from '@chakra-ui/react';
import { FiFile, FiCheck, FiSearch } from 'react-icons/fi';
import { toaster } from '@/shared/components/ui/toaster';
import type { Document } from '@prisma/client';

interface LinkDocumentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  requirementName: string;
  userDocuments: Document[];
  onLink: (documentId: string) => Promise<void>;
}

export function LinkDocumentDialog({
  isOpen,
  onClose,
  requirementName,
  userDocuments,
  onLink,
}: LinkDocumentDialogProps) {
  const [selectedDocId, setSelectedDocId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredDocuments = userDocuments.filter(doc => 
    doc.nomFichier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isImage = (filename: string) => {
    return /\.(jpg|jpeg|png|webp|gif)$/i.test(filename);
  };

  const handleSubmit = async () => {
    if (!selectedDocId) return;

    setIsSubmitting(true);
    try {
      await onLink(selectedDocId);
      onClose();
      setSelectedDocId(''); // Reset selection
      setSearchQuery('');
    } catch (error) {
      // Error handling is done in the parent or via toaster there
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={(e) => !e.open && onClose()} size="lg">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un document manquant</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack gap={4} align="stretch">
            <Text>
              Sélectionnez un document pour satisfaire le requis : <strong>{requirementName}</strong>
            </Text>
            
            <Box position="relative">
              <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" zIndex={1}>
                <FiSearch color="gray" />
              </Box>
              <Input 
                placeholder="Rechercher un document..." 
                pl={10}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Box>

            <Box maxH="400px" overflowY="auto" p={1}>
              <SimpleGrid columns={{ base: 2, md: 3 }} gap={4}>
                {filteredDocuments.map((doc) => {
                  const isSelected = selectedDocId === doc.id;
                  
                  return (
                    <Box
                      key={doc.id}
                      cursor="pointer"
                      borderWidth="2px"
                      borderColor={isSelected ? "primary.500" : "transparent"}
                      borderRadius="md"
                      bg={isSelected ? "primary.50" : "bg.subtle"}
                      p={3}
                      _hover={{ bg: isSelected ? "primary.50" : "bg.muted" }}
                      onClick={() => setSelectedDocId(doc.id)}
                      position="relative"
                      transition="all 0.2s"
                      boxShadow={isSelected ? "md" : "none"}
                    >
                      {isSelected && (
                        <Box
                          position="absolute"
                          top={2}
                          right={2}
                          bg="primary.500"
                          color="white"
                          borderRadius="full"
                          p={1}
                          zIndex={2}
                        >
                          <FiCheck size={12} />
                        </Box>
                      )}
                      <VStack gap={2}>
                        <Box 
                          p={doc.storageId ? 0 : 4} 
                          bg="white" 
                          borderRadius="md" 
                          boxShadow="sm"
                          color="primary.500"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          width="100%"
                          aspectRatio={1}
                          overflow="hidden"
                          position="relative"
                        >
                          {doc.storageId ? (
                            <Box width="100%" height="100%" position="relative">
                              <iframe 
                                src={`https://drive.google.com/file/d/${doc.storageId}/preview`}
                                width="100%" 
                                height="100%" 
                                style={{ border: 'none', pointerEvents: 'none' }}
                                title={doc.nomFichier}
                                loading="lazy"
                              />
                              {/* Overlay to capture clicks */}
                              <Box 
                                position="absolute" 
                                top={0} 
                                left={0} 
                                right={0} 
                                bottom={0} 
                                zIndex={1} 
                              />
                            </Box>
                          ) : (
                            <FiFile size={32} />
                          )}
                        </Box>
                        <Text 
                          fontSize="xs" 
                          fontWeight="medium" 
                          textAlign="center" 
                          lineClamp={2}
                          title={doc.nomFichier}
                        >
                          {doc.nomFichier}
                        </Text>
                      </VStack>
                    </Box>
                  );
                })}
              </SimpleGrid>
              
              {filteredDocuments.length === 0 && (
                <Text color="fg.muted" textAlign="center" py={8}>
                  {searchQuery ? "Aucun document trouvé pour cette recherche." : "Aucun document disponible."}
                </Text>
              )}
            </Box>
          </VStack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={onClose}>Annuler</Button>
          </DialogActionTrigger>
          <Button 
            onClick={handleSubmit} 
            loading={isSubmitting}
            disabled={!selectedDocId}
          >
            Ajouter
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
