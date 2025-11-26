import { VStack, Text, Spinner, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DialogRoot, DialogContent, DialogBody } from '../ui/dialog';

interface ProcessingStateProps {
  isOpen: boolean;
  onOpenChange?: (details: { open: boolean }) => void;
}

export function ProcessingState({ isOpen, onOpenChange }: ProcessingStateProps) {
  const [step, setStep] = useState(0);
  const steps = [
    "Sécurisation du document...",
    "Envoi vers le coffre-fort...",
    "Analyse par l'IA Gemini...",
    "Extraction des données...",
    "Finalisation..."
  ];

  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      return;
    }
    const interval = setInterval(() => {
      setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <DialogRoot 
      open={isOpen} 
      onOpenChange={onOpenChange} 
      placement="center" 
      motionPreset="slide-in-bottom"
      closeOnInteractOutside={false}
      closeOnEscape={false}
    >
      <DialogContent>
        <DialogBody>
          <VStack gap={6} py={8} align="center" w="full" justify="center">
            <Box position="relative" display="flex" alignItems="center" justifyContent="center">
              <Spinner 
                size="xl" 
                color="blue.500" 
                css={{ "--spinner-track-color": "colors.gray.200" }}
                borderWidth="4px"
                w="60px"
                h="60px"
              />
              <Box position="absolute" fontSize="xl">
                🤖
              </Box>
            </Box>
            
            <VStack gap={2} align="center">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <Text fontSize="lg" fontWeight="semibold" color="blue.600" textAlign="center">
                  {steps[step]}
                </Text>
              </motion.div>
              
              <Text fontSize="sm" color="gray.500" textAlign="center" maxW="xs">
                Veuillez patienter pendant que nous traitons votre document.
              </Text>
            </VStack>
          </VStack>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}
