import { Spinner } from "@/shared/components/ui/spinner";
import { Box } from "@chakra-ui/react";

export default function Loading() {
    return (
        <Box position="fixed" top="0" left="0" w="100vw" h="100vh" bg="bg.canvas" zIndex="tooltip" display="flex" alignItems="center" justifyContent="center">
            <Spinner size="xl" />
        </Box>
    );
}
