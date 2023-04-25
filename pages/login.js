import { Card, CardHeader, CardBody, CardFooter, Button, Box, Stack, FormControl, FormLabel, Input, HStack, Icon, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import Header from "../components/header/header";

export default function Login() {
  const [callbackUrl, setCallbackUrl] = useState("/");
  const router = useRouter();

  useEffect(() => {
    const storedCallbackUrl = localStorage.getItem("callbackUrl");
    if (storedCallbackUrl) {
      setCallbackUrl(storedCallbackUrl);
      localStorage.removeItem("callbackUrl");
    }
  }, []);

  const handleSignIn = async () => {
    const result = await signIn("google", { callbackUrl });

    if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <>
   <Box
   background="primaryGray.900"
  height="100vh" 
  display="flex" 
  justifyContent="center" 
  alignItems="center"
>
  <Box 
    maxW="sm" 
    mx="auto"
    background="#FFF"
    borderRadius="lg"
    py="8"
    transition="box-shadow 0.2s ease-in-out"
    _hover={{
      boxShadow: "xl",
    }}
    _active={{
      boxShadow: "md",
    }}
    boxShadow="md"
  >
    <Header />
    <Stack spacing="4" margin="10px">
      <Box textAlign="center">
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input type="email" />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" />
        </FormControl>
        <Button colorScheme="blackAlpha" size="lg">
          Sign in
        </Button>
      </Box>
      <HStack spacing="4" justifyContent="center">
        <Button leftIcon={<Icon as={FaGoogle} />} onClick={handleSignIn} size="sm" w="200px" h="50px">
          Sign in with Google
        </Button>
        <Button leftIcon={<Icon as={FaFacebook} />} colorScheme="facebook" size="sm" w="200px" h="50px">
          Sign in with Facebook
        </Button>
      </HStack>
      <Text fontSize="sm" color="gray.500" textAlign="center">
        © 2023 <Text as="span" fontWeight="bold">StudySpace</Text>. Todos los derechos reservados.
      </Text>
    </Stack>
  </Box>
</Box>




    </>
  );
}
