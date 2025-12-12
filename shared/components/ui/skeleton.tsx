'use client';

import { Skeleton as ChakraSkeleton, SkeletonProps as ChakraSkeletonProps, Box, BoxProps } from '@chakra-ui/react';

export interface SkeletonProps extends ChakraSkeletonProps { }

/**
 * A wrapper around Chakra UI's Skeleton component for consistent usage.
 */
export function Skeleton(props: SkeletonProps) {
    return (
        <ChakraSkeleton
            borderRadius="md"
            {...props}
        />
    );
}

export interface SkeletonCircleProps extends BoxProps {
    size?: string | number;
}

export function SkeletonCircle({ size = 10, ...props }: SkeletonCircleProps) {
    return (
        <Skeleton
            borderRadius="full"
            width={size}
            height={size}
            {...props}
        />
    );
}

export interface SkeletonTextProps extends BoxProps {
    noOfLines?: number;
    spacing?: string | number;
    skeletonHeight?: string | number;
}

export function SkeletonText({ noOfLines = 3, spacing = 2, skeletonHeight = 2, ...props }: SkeletonTextProps) {
    return (
        <Box width="full" {...props}>
            {Array.from({ length: noOfLines }).map((_, index) => (
                <Skeleton
                    key={index}
                    height={skeletonHeight}
                    width={index === noOfLines - 1 ? "80%" : "100%"}
                    mb={index !== noOfLines - 1 ? spacing : 0}
                />
            ))}
        </Box>
    );
}
