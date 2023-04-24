import {  Card, CardHeader, CardBody, CardFooter,Button, Box, Stack, FormControl, FormLabel,Input,HStack, Icon,Text } from "@chakra-ui/react";
import {useState, useEffect} from "react"
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import {FaGoogle, FaFacebook} from "react-icons/fa"

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
    <Box maxW="sm" mx="auto" py="8">
      <Stack spacing="4">
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input type="email" />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" />
        </FormControl>
        <Button colorScheme="#21201C" size="lg">
          Sign in
        </Button>
        <Stack spacing="4">
          <HStack spacing="4">
            <Button leftIcon={<Icon as={FaGoogle} />} onClick={handleSignIn}>
              Sign in with Google
            </Button>
            <Button leftIcon={<Icon as={FaFacebook} />} colorScheme="facebook">
              Sign in with Facebook
            </Button>
          </HStack>
          <Text fontSize="sm" color="gray.500" textAlign="center">
            © 2023 <Text as="span" style={{ fontWeight: "bold" }}>StudySpace</Text>.Todos los derechos reservados.
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}
