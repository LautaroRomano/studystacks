import { Card, CardHeader, CardBody, CardFooter, Image, Button, Box, Stack, FormControl, FormLabel, Input, HStack, Icon, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FaGoogle, FaFacebookF , FaRobot ,FaBook} from "react-icons/fa";
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

  const styles = {
    _hover: {
      background: "#e2e8f0",
    },
    _active: {
      background: "#cbd5e0",
    },
    _focus: {
      borderWidth: "2px",
      borderColor: "black.500",
    },
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
          <Input type="email" 
          _hover={styles._hover}
          _active={styles._active}
          _focus={styles._focus}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input 
          type="password"  
          _hover={styles._hover}
          _active={styles._active}
          _focus={styles._focus}
          />
        </FormControl>
        <HStack justifyContent="center" alignItems="center" spacing="2">
        <Button
        mt="20px"
        color="black"
        colorScheme="blue"
        // background="blackAlpha.600"
        // bgGradient='linear(to-r, teal.500, green.500)'
        // _hover={{
        // bgGradient: 'linear(to-r, red.500, yellow.500)',
        // }}
        size="md"
        leftIcon={<Icon as={FaRobot} />}
        rightIcon={<Icon as={FaRobot} />}
        style={{
          backgroundImage: "radial-gradient(circle, #5c0067 0%, #00d4ff 100%"
        }}
        // _active={styles._active}
        // _focus={styles._focus}
      >
          Sign in
        </Button>
      </HStack>
      </Box>
      <HStack spacing="4" justifyContent="center">
        <Button
        
        // leftIcon={<Icon as={FaGoogle} />} 
        onClick={handleSignIn} 
        size="sm" 
        w="200px" 
        h="50px"
        _hover={styles._hover}
        _active={styles._active}
        _focus={styles._focus}
        >
          <Image
              height="25px"
              width="25px"
              borderRadius="50%"
              objectFit="cover"
              src={"/images/google.png"}
              alt=""
            />
          Sign in with Google
        </Button>
        <Button leftIcon={<Icon as={FaFacebookF} 
              color="blue.600" height="20px" width="18px" />} 
        
        color="black"
        colorScheme="blue"
        background="#EDF2F7"
        size="sm" 
        w="200px" 
        h="50px"
        _hover={styles._hover}
        _active={styles._active}
        _focus={styles._focus}
        >
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
