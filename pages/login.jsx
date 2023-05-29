import { Divider , useMediaQuery ,Card, CardHeader, CardBody, CardFooter, Image, Button, Box, Stack, FormControl, FormLabel, Input, HStack, Icon, Text } from "@chakra-ui/react";
import { useState, useEffect, useMemo} from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FaGoogle, FaFacebookF , FaRobot ,FaBook} from "react-icons/fa";
import Header from "../components/header/header";

export default function Login() {
  const [callbackUrl, setCallbackUrl] = useState("/");
  const router = useRouter();

  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const boxStyles = useMemo(
    () => ({
      backgroundImage: "url('/images/footer-galaxy.webp')",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundSize: isMobile ? "cover" : "contain",
    }),
    [isMobile]
  );

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
    _hoverBottonSignIn: {
      // background: "black",
      border: "2px dashed white",
      // opacity: 0.8
    },
    _hoverBotton: {
      background: "black",
      border: "2px dashed white",
      // opacity: 0.8
    },
    _hoverInput:{
      border: "2px dashed white",
      background: "#e2e8f0",
      opacity: 0.8
    },
    _active: {
      background: "#cbd5e0",
      // opacity: 0.8
    },
    _focus: {
      borderWidth: "2px",
      borderColor: "black.500",
    },
  };

  // const bgStyle = {
  //   backgroundImage: "url(/images/stars.jpg)",
  //   backgroundRepeat: "no-repeat",
  //   backgroundPosition: "center center",
  //   backgroundSize: "cover",
  //   opacity: 0.9
  // }



  return (
    <>
    <Box
 style={boxStyles}
// backgroundImage="url('/images/footer-galaxy.webp')"
  // height="100vh"
  // display="flex"
  // justifyContent="center"
  // alignItems="center"
>
  <Box
    position="absolute"
    top="50%"
    left="50%"
    transform="translate(-50%, -50%)"
    maxW="sm"
    borderRadius="lg"
    pb="8"
    transition="box-shadow 0.2s ease-in-out"
    _hover={{
      boxShadow: "xl",
    }}
    _active={{
      boxShadow: "md",
    }}
    boxShadow="md"
    opacity="0.8" // Agregando opacidad al box principal
  >
    <Header />

    <Stack spacing="4" marginX="10px" marginY={"25px"}>
      <Box textAlign="center" marginY={"15px"}>
        <FormControl id="email" my={"15px"}>
          <FormLabel color="white">Email</FormLabel>
          <Input
            type="email"
            _hover={styles._hoverInput}
            _active={styles._active}
            _focus={styles._focus}
            // opacity="0.7" // Agregando opacidad al input de email
          />
        </FormControl>
        <FormControl id="password" my={"15px"}>
          <FormLabel color="white">Password</FormLabel>
          <Input
            type="password"
            _hover={styles._hoverInput}
            _active={styles._active}
            _focus={styles._focus}
            // opacity="0.7" // Agregando opacidad al input de password
          />
        </FormControl>
        <HStack justifyContent="center" alignItems="center" spacing="2">
          <Button
            mt="20px"
            color="white"
            colorScheme="blue"
            border="1px solid white"
            bgImage="linear-gradient(45deg, #212131, #353545)"
            size="md"
            _hover={styles._hoverBottonSignIn}
            _active={styles._active}
            _focus={styles._focus}
            leftIcon={<Icon as={FaRobot} color="white" />}
            rightIcon={<Icon as={FaRobot} color="white" />}
            // opacity="0.7" // Agregando opacidad al botón de iniciar sesión
          >
            Inicia sesion
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
          color="white"
          border="1px solid white"
          bg="transparent"
          _hover={styles._hoverBotton}
          _active={styles._active}
          _focus={styles._focus}
           opacity="1" // Agregando opacidad al botón de Google
        >
          <Image
            height="25px"
            width="25px"
            borderRadius="50%"
            objectFit="cover"
            src={"/images/google.png"}
            alt=""
            me={"5px"}
          />
          Ingresar con Google
        </Button>
        <Button
          leftIcon={
            <Icon
              as={FaFacebookF}
              color="blue.600"
              height="20px"
              width="18px"
            />
          }
          color="white"
          border="1px solid white"
          colorScheme="blue"
          background="transparent"
          size="sm"
          w="200px"
          h="50px"
          _hover={styles._hoverBotton}
          _active={styles._active}
          _focus={styles._focus}
          // opacity="0.7" // Agregando opacidad al botón de Facebook
          >
            Ingresar con Facebook
            </Button>
  </HStack>
</Stack>

<Divider my={"25px"} />

<Text color="white" fontSize="sm" textAlign="center">
  © 2023 Todos los derechos reservados
</Text>

</Box>
</Box>


    </>

  );


}
