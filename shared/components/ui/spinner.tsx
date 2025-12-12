'use client';

import { Spinner as ChakraSpinner, SpinnerProps as ChakraSpinnerProps, Flex } from '@chakra-ui/react';

export interface SpinnerProps extends ChakraSpinnerProps {
    /**
     * If true, centers the spinner in a flex container filling the parent
     */
    center?: boolean;
}

/**
 * A wrapper around Chakra UI's Spinner component.
 */
export function Spinner({ center, color = "primary.500", size = "xl", ...props }: SpinnerProps) {
    const spinner = (
        <ChakraSpinner
            color={color}
            size={size}
            {...props}
        />
    );

    if (center) {
        return (
            <Flex width="full" height="full" minH="200px" alignItems="center" justifyContent="center">
                {spinner}
            </Flex>
        );
    }

    return spinner;
}
