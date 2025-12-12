'use client';

import { Box, SimpleGrid, VStack, HStack } from '@chakra-ui/react';
import { Skeleton, SkeletonText } from '@/shared/components/ui/skeleton';

export function DocumentsGridSkeleton() {
    return (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap="6" width="full">
            {[...Array(8)].map((_, i) => (
                <Box
                    key={i}
                    bg="white"
                    p="4"
                    borderRadius="lg"
                    borderWidth="1px"
                    borderColor="border.muted"
                >
                    <VStack align="start" gap="4">
                        <HStack width="full" justify="space-between">
                            <Skeleton height="10" width="10" borderRadius="md" />
                            <Skeleton height="8" width="8" borderRadius="full" />
                        </HStack>

                        <SkeletonText noOfLines={2} spacing="2" skeletonHeight="4" width="80%" />

                        <HStack width="full" pt="2">
                            <Skeleton height="6" width="20" borderRadius="full" />
                            <Skeleton height="6" width="20" borderRadius="full" />
                        </HStack>
                    </VStack>
                </Box>
            ))}
        </SimpleGrid>
    );
}
