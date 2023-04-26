import { Box,Button, Flex, Heading, Text } from "@chakra-ui/react";

export default function Header() {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      color="white"
      borderBottom="1px solid white"
      paddingBottom="20px"
      marginBottom="20px"
    >
      <Box>
        <Heading as="h1" size="lg" fontWeight="bold">
          StudySpace
        </Heading>
        <Text fontSize="sm">Tu plataforma de aprendizaje en línea</Text>
      </Box>
      <Box>
        <Button 
          size="md"
          fontSize="md"
          fontWeight="semibold"
          colorScheme="blue"
          mr="4"
        >
          Regístrate
        </Button>
        <Button 
          size="md"
          fontSize="md"
          fontWeight="semibold"
          colorScheme="blue"
        >
          Inicia sesión
        </Button>
      </Box>
    </Flex>
  );
}