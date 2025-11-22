import { Box, VStack, HStack, Text } from '@chakra-ui/react';
import { PricingPlan } from './types';

// Standard Icon (Award)
function StandardIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path 
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

// Premium Icon (Crown)
function PremiumIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path 
        d="M2 20h20M6 20V9M12 20V4M18 20V14M3 4l3 5 6-6 6 6 3-5v12H3V4z" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

// Check Icon
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path 
        d="M13.3333 4L6 11.3333L2.66666 8" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface PricingCardProps {
  plan: PricingPlan;
  isSelected: boolean;
  onSelect: () => void;
}

export function PricingCard({ plan, isSelected, onSelect }: PricingCardProps) {
  return (
    <Box
      bg="bg.surface"
      borderRadius="xl"
      border="1px solid"
      borderColor={isSelected ? 'primary.500' : 'border.default'}
      overflow="hidden"
      position="relative"
      cursor="pointer"
      onClick={onSelect}
      transition="all 0.2s"
      _hover={{ borderColor: isSelected ? 'primary.600' : 'neutral.300' }}
    >
      <Box p={4} position="relative">
        <VStack gap={2} align="center">
          {/* Icon */}
          <Box w="24px" h="24px" color="text.fg">
            {plan.icon === 'standard' ? <StandardIcon /> : <PremiumIcon />}
          </Box>

          {/* Title and Price */}
          <VStack gap={0} align="center">
            <Text fontSize="lg" fontWeight="normal" color="text.fg" textAlign="center">
              {plan.name}
            </Text>
            <Text fontSize="lg" fontWeight="medium" color="text.fg" textAlign="center">
              {plan.price.toFixed(2)}€/mois
            </Text>
          </VStack>

          {/* Features */}
          <VStack gap={1.5} align="flex-start" pt={2}>
            {plan.features.map((feature, index) => (
              <HStack key={index} gap={1} align="flex-start">
                <Box w="16px" h="16px" color="text.fg.muted" flexShrink={0} mt={0.5}>
                  <CheckIcon />
                </Box>
                <Text fontSize="sm" fontWeight="normal" color="text.fg.muted" lineHeight="1.4">
                  {feature}
                </Text>
              </HStack>
            ))}
          </VStack>
        </VStack>

        {/* Checkbox */}
        <Box position="absolute" top={4} right={4}>
          <Box
            w="16px"
            h="16px"
            borderRadius="sm"
            border="1px solid"
            borderColor={isSelected ? 'primary.600' : 'neutral.300'}
            bg={isSelected ? 'primary.600' : 'bg.surface'}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {isSelected && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M10 3L4.5 8.5L2 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
