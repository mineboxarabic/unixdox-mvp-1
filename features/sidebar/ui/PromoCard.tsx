'use client';

import { Box, Flex, Text, Button } from '@chakra-ui/react';
import { LuCrown, LuArrowUpRight } from 'react-icons/lu';
import { useRouter } from 'next/navigation';

interface PromoCardProps {
  isCollapsed?: boolean;
}

export function PromoCard({ isCollapsed = false }: PromoCardProps) {
  const router = useRouter();
  if (isCollapsed) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={2}
        bg="primary.50"
        borderRadius="lg"
        cursor="pointer"
      >
        <LuCrown size={20} color="#2f45ff" />
      </Box>
    );
  }

  return (
    <Box
      bg="primary.50"
      border="1px solid"
      borderColor="primary.200"
      borderRadius="xl"
      p={3}
      overflow="hidden"
    >
      <Flex direction="column" gap={2}>
        {/* Title with crown icon */}
        <Flex direction="column" align="flex-start">
          <LuCrown size={20} color="#2f45ff" />
          <Text fontSize="sm" fontWeight="normal" color="primary.600">
            Gagnez encore plus de temps
          </Text>
        </Flex>

        {/* Description */}
        <Text fontSize="xs" color="gray.600" lineHeight="short">
          Obtenez un stockage et classement par IA illimité ainsi que la fonctionnalité échéances à venir.
        </Text>

        {/* CTA Button */}
        <Button
          size="sm"
          bg="primary.solid"
          color="white"
          borderRadius="full"
          _hover={{ bg: 'primary.500' }}
          w="full"
          h="32px"
          onClick={() => router.push('/upgrade')}
          data-testid="promo-upgrade-btn"
        >
          <Flex align="center" gap={1}>
            <Text fontSize="xs">Passer à Unidox premium</Text>
            <LuArrowUpRight size={18} />
          </Flex>
        </Button>
      </Flex>
    </Box>
  );
}
