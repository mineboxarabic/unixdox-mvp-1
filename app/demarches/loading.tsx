'use client';

import { HStack, Input, Text, Flex, Box } from '@chakra-ui/react';
import { PageLayout } from '@/shared/components/PageLayout';
import { FiFolder, FiPlus, FiSearch } from 'react-icons/fi';
import { Button } from '@/shared/components/ui/button';
import { DemarcheGrid } from '@/features/demarches/ui/components/DemarcheGrid';

export default function Loading() {
    return (
        <PageLayout
            title="Démarches"
            icon={<FiFolder size={24} color="var(--chakra-colors-primary-600)" />}
            headerLeft={
                <HStack gap={2} fontSize="sm" color="fg.muted">
                    <Text>Démarches</Text>
                    <Text>&gt;</Text>
                    <Text fontWeight="medium" color="fg.default">
                        Nom de la démarche
                    </Text>
                </HStack>
            }
            headerCenter={
                <Box position="relative" width="full">
                    <Box position="absolute" left={3} top="50%" transform="translateY(-50%)">
                        <FiSearch size={18} color="gray" />
                    </Box>
                    <Input
                        placeholder="Recherchez un fichier, une démarche..."
                        pl={10}
                        size="md"
                        bg="bg.surface"
                        border="1px"
                        borderColor="border.default"
                        borderRadius="lg"
                        readOnly
                    />
                </Box>
            }
            action={
                <Button
                    size="md"
                    bg="primary.600"
                    color="white"
                    borderRadius="full"
                    _hover={{ bg: 'primary.500' }}
                    disabled
                >
                    <Flex align="center" gap={2}>
                        <FiPlus />
                        <Text>Commencer une démarche</Text>
                    </Flex>
                </Button>
            }
        >
            <DemarcheGrid demarches={[]} isLoading={true} />
        </PageLayout>
    );
}
