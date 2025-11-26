import { Box, Text, VStack } from '@chakra-ui/react';
import { LuFileText } from 'react-icons/lu';

export function DocumentsEmptyState() {
    return (
        <Box position="relative" overflow="hidden" minH="400px" mx="auto" maxW="600px">
            {/* Gradient Background */}
            <Box
                position="absolute"
                left="50%"
                bottom="0"
                transform="translateX(-50%)"
                width="500px"
                height="300px"
                bgGradient="radial-gradient(ellipse 500px 300px at 50% 100%, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.12) 30%, rgba(59, 130, 246, 0.06) 50%, transparent 75%)"
                filter="blur(50px)"
                pointerEvents="none"
                zIndex="0"
            />

            <Box position="relative" zIndex="1">
                <Box
                    bg="bg.surface"
                    borderRadius="xl"
                    border="1px solid"
                    borderColor="border.muted"
                    p={8}
                    boxShadow="sm"
                >
                    <VStack gap={6}>
                        <Box
                            p={5}
                            bg="primary.50"
                            borderRadius="full"
                            color="primary.600"
                        >
                            <LuFileText size={48} />
                        </Box>
                        <VStack gap={2}>
                            <Text fontSize="lg" fontWeight="semibold" color="text.fg">
                                Aucun document trouvé
                            </Text>
                            <Text fontSize="sm" color="text.fg.muted" textAlign="center">
                                Commencez par ajouter votre premier document
                            </Text>
                        </VStack>
                    </VStack>
                </Box>
            </Box>
        </Box>
    );
}
