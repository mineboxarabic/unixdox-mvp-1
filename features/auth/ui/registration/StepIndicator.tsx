import { Box, HStack, VStack, Text } from '@chakra-ui/react';

interface Step {
  id: number;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <VStack w="full" pt={16} gap={3} align="center">
      <HStack gap={3} align="flex-start">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <HStack key={step.id} gap={2} align="center">
              <Box
                w="24px"
                h="24px"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg={isActive ? 'blue.100' : 'transparent'}
                border="2px solid"
                borderColor={isActive ? 'blue.600' : isCompleted ? 'blue.600' : 'gray.300'}
                overflow="hidden"
              >
                <Text
                  fontSize="xs"
                  fontWeight="medium"
                  color={isActive || isCompleted ? 'gray.900' : 'gray.500'}
                >
                  {stepNumber}
                </Text>
              </Box>
              
              <VStack gap={1.5} align="flex-start">
                <Text
                  fontSize="sm"
                  fontWeight="semibold"
                  color="gray.700"
                  lineHeight="1.25"
                  whiteSpace="pre-line"
                >
                  {step.title}
                </Text>
              </VStack>
            </HStack>
          );
        })}
      </HStack>
    </VStack>
  );
}
