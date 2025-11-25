import { VStack, Text, Spinner, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function ProcessingState() {
  const [step, setStep] = useState(0);
  const steps = [
    "Sécurisation du document...",
    "Envoi vers le coffre-fort...",
    "Analyse par l'IA Gemini...",
    "Extraction des données...",
    "Finalisation..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <VStack gap={8} py={12} align="center" w="full" justify="center" minH="300px">
      <Box position="relative" display="flex" alignItems="center" justifyContent="center">
        <Spinner 
          size="xl" 
          color="blue.500" 
          css={{ "--spinner-track-color": "colors.gray.200" }}
          borderWidth="4px"
          w="80px"
          h="80px"
        />
        <Box position="absolute" fontSize="2xl">
          🤖
        </Box>
      </Box>
      
      <VStack gap={3} align="center">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          <Text fontSize="xl" fontWeight="semibold" color="blue.600" textAlign="center">
            {steps[step]}
          </Text>
        </motion.div>
        
        <Text fontSize="sm" color="gray.500" textAlign="center" maxW="xs">
          Notre intelligence artificielle analyse votre document pour extraire les informations importantes.
        </Text>
      </VStack>
    </VStack>
  );
}
