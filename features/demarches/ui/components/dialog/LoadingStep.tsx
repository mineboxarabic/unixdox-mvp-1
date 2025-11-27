'use client';

import { useEffect, useState } from 'react';
import { Box, Text, VStack, Progress } from '@chakra-ui/react';
import { 
  DialogHeader, 
  DialogBody, 
  DialogTitle,
} from '@/shared/components/ui/dialog';

interface LoadingStepProps {
  modeleTitre: string;
  message?: string;
  /** Duration of the loading animation in milliseconds (default: 3000ms) */
  duration?: number;
}

export function LoadingStep({ 
  modeleTitre,
  message = 'Unidox s\'occupe de créer le dossier',
  duration = 3000
}: LoadingStepProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const targetProgress = 95;
    let currentProgress = 0;
    let lastUpdate = Date.now();
    
    // Generate random speed bumps (slower periods)
    const speedBumps: { start: number; end: number }[] = [];
    const numBumps = 2 + Math.floor(Math.random() * 2); // 2-3 speed bumps
    for (let i = 0; i < numBumps; i++) {
      const start = 10 + Math.random() * 70; // Random position between 10-80%
      speedBumps.push({ start, end: start + 5 + Math.random() * 10 }); // 5-15% duration
    }
    
    const interval = setInterval(() => {
      const now = Date.now();
      const deltaTime = now - lastUpdate;
      lastUpdate = now;
      
      // Base speed to complete in roughly the duration
      let speed = (targetProgress / duration) * deltaTime;
      
      // Check if we're in a speed bump zone
      const inSpeedBump = speedBumps.some(
        bump => currentProgress >= bump.start && currentProgress <= bump.end
      );
      
      if (inSpeedBump) {
        // Slow down significantly during speed bumps
        speed *= 0.15 + Math.random() * 0.15; // 15-30% of normal speed
      } else {
        // Add some randomness to normal speed (faster to compensate for bumps)
        speed *= 1.2 + Math.random() * 0.6; // 120-180% of normal speed
      }
      
      currentProgress = Math.min(currentProgress + speed, targetProgress);
      setProgress(currentProgress);
      
      if (currentProgress >= targetProgress) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <>
      <DialogHeader>
        <DialogTitle>Création du dossier pour {modeleTitre}</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <VStack gap={4} py={6} align="stretch">
          <Text fontSize="md" color="fg.muted">
            {message}
          </Text>
          <Box w="full">
            <Progress.Root value={progress} size="md" borderRadius="full">
              <Progress.Track bg="neutral.100" borderRadius="full">
                <Progress.Range bg="primary.500" borderRadius="full" />
              </Progress.Track>
            </Progress.Root>
          </Box>
        </VStack>
      </DialogBody>
    </>
  );
}
