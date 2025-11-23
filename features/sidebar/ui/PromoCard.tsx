'use client';

import { Box, Flex, Text, Button } from '@chakra-ui/react';
import { LuCrown, LuArrowUpRight } from 'react-icons/lu';

interface PromoCardProps {
  isCollapsed?: boolean;
}

export function PromoCard({ isCollapsed = false }: PromoCardProps) {
  if (isCollapsed) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={2}
        bg="primary.100"
        borderRadius="lg"
        cursor="pointer"
      >
        <LuCrown size={20} color="#2563EB" />
      </Box>
    );
  }

  return (
    <Box
      position="relative"
      bg="primary.100"
      border="1px solid"
      borderColor="border.default"
      borderRadius="xl"
      p={2.5}
      overflow="hidden"
    >
      {/* Background gradients */}
      <Box
        position="absolute"
        top="-111px"
        left="-116px"
        w="244px"
        h="229px"
        bg="primary.50"
        borderRadius="full"
        filter="blur(60px)"
        opacity={0.6}
        pointerEvents="none"
      />
      <Box
        position="absolute"
        top="70px"
        left="-6px"
        w="307px"
        h="157px"
        bg="primary.200"
        borderRadius="full"
        filter="blur(80px)"
        opacity={0.4}
        pointerEvents="none"
      />
      <Box
        position="absolute"
        top="92px"
        left="-35px"
        w="307px"
        h="148.5px"
        bg="primary.600"
        borderRadius="full"
        filter="blur(90px)"
        opacity={0.3}
        pointerEvents="none"
      />

      <Flex direction="column" gap={2} position="relative" zIndex={1}>
        <Flex align="center" gap={1}>
          <LuCrown size={18} color="#2563EB" />
          <Text fontSize="sm" fontWeight="normal" color="primary.600">
            Gagnez encore plus de temps
          </Text>
        </Flex>

        <Text fontSize="xs" color="text.fg.muted">
          Obtenez un stockage et classement par IA illimité ainsi que la fonctionnalité échéances à venir.
        </Text>

        <Button
          size="sm"
          bg="primary.600"
          color="white"
          borderRadius="full"
          _hover={{ bg: 'primary.500' }}
          w="full"
        >
          <Flex align="center" gap={1}>
            <Text fontSize="xs">Passer à Unidox premium</Text>
            <LuArrowUpRight size={16} />
          </Flex>
        </Button>
      </Flex>
    </Box>
  );
}
