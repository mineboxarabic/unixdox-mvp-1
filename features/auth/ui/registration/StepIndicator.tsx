import { Box, HStack, Text } from '@chakra-ui/react';

interface Step {
  id: number;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

/**
 * StepIndicator component based on CUI 2.1 Steps.List design from Figma
 * Displays a horizontal stepper with numbered circles connected by lines
 */
export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <HStack gap={3} align="center" w="full" justify="center">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;
        const isLast = index === steps.length - 1;
        
        return (
          <HStack key={step.id} gap={2} align="center" flex={isLast ? '0' : '1'}>
            {/* Step Circle and Label */}
            <HStack gap={2} align="center" flexShrink={0} maxW="120px">
              <Box
                w="24px"
                h="24px"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg={isActive || isCompleted ? 'blue.200' : 'transparent'}
                border="2px solid"
                borderColor={isActive || isCompleted ? 'blue.600' : 'gray.300'}
                flexShrink={0}
              >
                <Text
                  fontSize="12px"
                  fontWeight="500"
                  color="gray.800"
                  lineHeight="16px"
                >
                  {stepNumber}
                </Text>
              </Box>
              
              <Text
                fontSize="14px"
                fontWeight="600"
                color="gray.800"
                lineHeight="20px"
                whiteSpace="normal"
                wordBreak="break-word"
              >
                {step.title}
              </Text>
            </HStack>
            
            {/* Separator Line */}
            {!isLast && (
              <Box
                flex="1"
                h="0"
                borderTop="1px solid"
                borderColor="gray.300"
                minW="32px"
              />
            )}
          </HStack>
        );
      })}
    </HStack>
  );
}
