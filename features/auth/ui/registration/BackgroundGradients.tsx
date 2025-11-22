import { Box } from '@chakra-ui/react';

export function BackgroundGradients() {
  return (
    <Box 
      position="absolute" 
      inset="0" 
      overflow="hidden" 
      pointerEvents="none"
    >
      {/* Large blue gradient - bottom right */}
      <Box
        position="absolute"
        w="1364px"
        h="1216px"
        left="696px"
        top="750px"
        bg="primary.500"
        borderRadius="full"
        boxShadow="248px 248px 248px"
        filter="blur(124.05px)"
      />
      
      {/* Blue gradient - top right */}
      <Box
        position="absolute"
        w="821px"
        h="657px"
        left="1117px"
        top="-312px"
        bg="primary.500"
        borderRadius="full"
        boxShadow="248px 248px 248px"
        filter="blur(124.05px)"
      />
      
      {/* Light blue gradient - top right */}
      <Box
        position="absolute"
        w="671px"
        h="551px"
        left="1192px"
        top="-312px"
        bg="primary.400"
        opacity="0.39"
        borderRadius="full"
        boxShadow="248px 248px 248px"
        filter="blur(124.05px)"
      />
      
      {/* White gradient - top center */}
      <Box
        position="absolute"
        w="1011px"
        h="905px"
        left="626px"
        top="-242px"
        bg="bg.canvas"
        borderRadius="full"
        boxShadow="248px 248px 248px"
        filter="blur(124.05px)"
      />
      
      {/* Large white gradient - bottom center */}
      <Box
        position="absolute"
        w="1507px"
        h="1388px"
        left="417px"
        top="671px"
        bg="bg.canvas"
        borderRadius="full"
        boxShadow="248px 248px 248px"
        filter="blur(124.05px)"
      />
      
      {/* Blue gradient - bottom left center */}
      <Box
        position="absolute"
        w="1267px"
        h="1216px"
        left="329px"
        top="733px"
        bg="primary.400"
        borderRadius="full"
        boxShadow="248px 248px 248px"
        filter="blur(124.05px)"
      />
      
      {/* Light blue gradient - middle left */}
      <Box
        position="absolute"
        w="1267px"
        h="1216px"
        left="141px"
        top="282px"
        bg="primary.400"
        opacity="0.36"
        borderRadius="full"
        boxShadow="248px 248px 248px"
        filter="blur(124.05px)"
      />
      
      {/* Orange accent - top center */}
      <Box
        position="absolute"
        w="172px"
        h="173px"
        left="808px"
        top="-85px"
        bg="accent.500"
        borderRadius="full"
        boxShadow="248px 248px 248px"
        filter="blur(124.05px)"
      />
      
      {/* Large white gradient - bottom left */}
      <Box
        position="absolute"
        w="1400px"
        h="1264px"
        left="-16px"
        top="555px"
        bg="bg.canvas"
        borderRadius="full"
        boxShadow="248px 248px 248px"
        filter="blur(124.05px)"
      />
      
      {/* Orange accent - bottom center */}
      <Box
        position="absolute"
        w="115px"
        h="107px"
        left="980px"
        top="1052px"
        bg="accent.500"
        borderRadius="full"
        boxShadow="248px 248px 248px"
        filter="blur(124.05px)"
      />
    </Box>
  );
}
