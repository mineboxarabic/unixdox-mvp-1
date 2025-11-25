import { Box, Text, Textarea as ChakraTextarea, TextareaProps as ChakraTextareaProps } from "@chakra-ui/react";
import { forwardRef } from "react";
import { Input, InputProps } from "./input";

export interface FormInputProps extends InputProps {
    label?: string;
    helperText?: string;
    errorText?: string;
    textarea?: boolean;
    // If textarea is true, we might need to accept TextareaProps, but for simplicity we'll intersect
    rows?: number;
    resize?: ChakraTextareaProps['resize'];
}

export const FormInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormInputProps>(
    ({ label, helperText, errorText, required, textarea, rows, resize, ...props }, ref) => {
        return (
            <Box width="full">
                {label && (
                    <Text fontSize="sm" fontWeight="medium" mb={1.5} color="fg.default">
                        {label} {required && <Text as="span" color="red.500">*</Text>}
                    </Text>
                )}

                {textarea ? (
                    <ChakraTextarea
                        ref={ref as any}
                        rows={rows}
                        resize={resize}
                        borderRadius="md"
                        border="1px solid"
                        borderColor={errorText ? "red.500" : "border.default"}
                        bg="bg.surface"
                        color="text.fg"
                        _placeholder={{ color: "text.fg.subtle" }}
                        _hover={{ borderColor: errorText ? "red.600" : "primary.400" }}
                        _focus={{
                            borderColor: errorText ? "red.500" : "primary.500",
                            boxShadow: errorText
                                ? "0 0 0 1px var(--chakra-colors-red-500)"
                                : "0 0 0 1px var(--chakra-colors-primary-500)",
                        }}
                        required={required}
                        {...(props as any)}
                    />
                ) : (
                    <Input
                        ref={ref as any}
                        required={required}
                        borderColor={errorText ? "red.500" : undefined}
                        _hover={{ borderColor: errorText ? "red.600" : "primary.400" }}
                        _focus={{
                            borderColor: errorText ? "red.500" : "primary.500",
                            boxShadow: errorText
                                ? "0 0 0 1px var(--chakra-colors-red-500)"
                                : "0 0 0 1px var(--chakra-colors-primary-500)",
                        }}
                        {...props}
                    />
                )}

                {helperText && !errorText && (
                    <Text fontSize="xs" color="fg.muted" mt={1.5}>
                        {helperText}
                    </Text>
                )}

                {errorText && (
                    <Text fontSize="xs" color="red.500" mt={1.5}>
                        {errorText}
                    </Text>
                )}
            </Box>
        );
    }
);

FormInput.displayName = "FormInput";
