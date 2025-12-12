'use client';

import { Box, Container, Flex, Heading, HStack, VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface PageLayoutProps {
    /**
     * Content to display in the sticky header's left side (usually breadcrumbs)
     */
    headerLeft?: ReactNode;
    /**
     * Content to display in the sticky header's center (usually search bar)
     */
    headerCenter?: ReactNode;
    /**
     * Icon component to display before the page title
     */
    icon?: ReactNode;
    /**
     * Main page title
     */
    title: string;
    /**
     * Primary action button(s) to display in the top right of the page content
     */
    action?: ReactNode;
    /**
     * Main page content
     */
    children: ReactNode;
}

export function PageLayout({
    headerLeft,
    headerCenter,
    icon,
    title,
    action,
    children,
}: PageLayoutProps) {
    return (
        <Box width="100%" minH="100vh" bg="bg.canvas">
            {/* Sticky Top Header */}
            <Box
                position="sticky"
                top={0}
                bg="bg.canvas"
                borderBottom="1px"
                borderColor="border.muted"
                zIndex={10}
                px={8}
                py={4}
            >
                <Flex justify="center" align="center" gap={8}>
                    {/* Left Slot (Breadcrumbs) */}
                    <Box flex={1}>
                        {headerLeft}
                    </Box>

                    {/* Center Slot (Search) */}
                    <Box flex={2} maxW="700px">
                        {headerCenter}
                    </Box>

                    {/* Right Spacer to balance the flex if needed, or specific right slot */}
                    <Box flex={1} />
                </Flex>
            </Box>

            {/* Main Content Container */}
            <Container maxW="1200px" py={8} px={8}>
                <VStack align="stretch" gap={6}>
                    {/* Page Header */}
                    <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
                        <HStack gap={3}>
                            {icon && (
                                <Box
                                    p={2}
                                    bg="primary.50"
                                    borderRadius="md"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    {icon}
                                </Box>
                            )}
                            <Heading size="lg" fontWeight="semibold" color="fg.default">
                                {title}
                            </Heading>
                        </HStack>

                        {action && <Box>{action}</Box>}
                    </Flex>

                    {/* Page Content */}
                    <Box py={6}>
                        {children}
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
}
