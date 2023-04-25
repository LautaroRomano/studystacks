import { Box,Button, Flex, Heading, Text } from "@chakra-ui/react";

export default function Header() {
  return (
    <Box
    // bgImage="linear-gradient(45deg, #21201C, #5E5E5E)"
    color="white"
    py="4"
  >
    <Flex justifyContent="center" alignItems="center" flexWrap="wrap" color="black">
      <Box mr="4">
        <Heading as="h1" size="lg" fontWeight="bold">
          StudySpace
        </Heading>
        <Text fontSize="sm">Tu plataforma de aprendizaje en línea</Text>
      </Box>
      <Box ml="4">
        <Text fontSize="sm">¡Bienvenido de vuelta!</Text>
        <Heading as="h2" size="md" fontWeight="semibold">
          Inicia sesión para continuar
        </Heading>
      </Box>
    </Flex>
  </Box>
  );
}