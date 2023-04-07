import { Flex, Image, Text, Input, Button, Link } from "@chakra-ui/react";
import GoogleIcon from "@mui/icons-material/Google";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import axios from "axios";
import { signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Navbar({ session, userLoggin, setUserLogin }) {
  const [viewUserSettings, setViewUserSettings] = useState(false);

  useEffect(() => {
    if (session && session.status === "authenticated" && !userLoggin) {
      const email = session.data.user.email;
      axios.get(`/api/login/isloggedin/${email}`).then(({ data }) => {
        if (data.length > 0) setUserLogin(data[0]);
      });
    }
  }, [session]);
  return (
    <Flex
      w={["100vw", "80vw", "700px", "700px", "700px"]}
      bg="#FFF"
      paddingBottom="14px"
      paddingX="14px"
      position="fixed"
      color={"primaryGray.500"}
      alignItems={"center"}
      p={"15px"}
      h={"65px"}
      boxShadow={"0px 6px 9px -1px rgba(161,161,161,1)"}
      borderBottom={"1px solid #ababab"}
      justifyContent={"space-between"}
      zIndex="10"
    >
      <Flex alignItems={"center"}>
        <Flex
          height="40px"
          width="40px"
          position={"relative"}
          cursor={"pointer"}
          _hover={{ opacity: ".8" }}
          me={"25px"}
        >
          <Link href="/">
            <Image
              height="40px"
              width="40px"
              borderRadius="50%"
              objectFit="cover"
              src={"/images/logo.png"}
              alt=""
            />
          </Link>
        </Flex>
        {session && session.status === "authenticated" && (
          <Text
            letterSpacing=".4px"
            fontSize="14px"
            fontWeight="500"
            color="primaryGray.500"
          >
            @{userLoggin.username}
          </Text>
        )}
      </Flex>

      {viewUserSettings && (
        <UserSettings
          session={session}
          userLoggin={userLoggin}
          setUserLogin={setUserLogin}
        />
      )}
      <Flex
        height="40px"
        width="40px"
        position={"relative"}
        onClick={() => setViewUserSettings((state) => !state)}
        cursor={"pointer"}
        _hover={{ opacity: ".8" }}
      >
        <Image
          height="40px"
          width="40px"
          borderRadius="50%"
          objectFit="cover"
          src={userLoggin.image}
          alt=""
        />
      </Flex>
    </Flex>
  );
}

const UserSettings = ({ session, userLoggin, setUserLogin }) => {
  const [registerData, setRegisterData] = useState({});

  const handleRegister = () => {
    if (session.status !== "authenticated") return;
    const data = {
      username: registerData.username,
      email: session.data.user.email,
      password: registerData.username,
      last_login_date: null,
      image: session.data.user.image,
    };

    axios.post(`/api/users`, data).then(({ data }) => {
      if (data.length > 0) setUserLogin(data[0]);
    });
  };
  const handleChangeData = ({ target }) => {
    setRegisterData((data) => ({
      ...data,
      [target.name]: target.value,
    }));
  };

  return (
    <Flex
      position={"absolute"}
      w={"400px"}
      h={"400px"}
      bg={"primaryGray.700"}
      top={"65px"}
      right={"0%"}
      zIndex={"100"}
      borderRadius={"15px"}
      shadow={"2xl"}
    >
      {session && session.status === "authenticated" ? (
        <Flex flexDir={"column"} w={"100%"} alignItems={"center"}>
          {!userLoggin && (
            <Flex
              w={"100%"}
              alignItems={"center"}
              justifyContent={"center"}
              mt={"15px"}
              flexDir={"column"}
            >
              <Flex h={"1px"} w={"90%"} bg={"gray.300"}></Flex>
              <Flex my={"8px"}>
                <Text ms={"10px"}>Termina de completar tus datos</Text>
              </Flex>
              <Flex my={"8px"} flexDir={"column"}>
                <Text ms={"10px"}>Como quieres que te llamemos?</Text>
                <Input
                  placeholder={"@"}
                  name="username"
                  value={registerData.username}
                  onChange={handleChangeData}
                ></Input>
              </Flex>
              <Flex my={"8px"} flexDir={"column"}>
                <Text ms={"10px"}>Crea una contrasena</Text>
                <Input
                  placeholder={"******"}
                  name="password"
                  value={registerData.password}
                  onChange={handleChangeData}
                ></Input>
              </Flex>
              <Button
                colorScheme="blue"
                size="sm"
                mb={"10px"}
                onClick={handleRegister}
              >
                Guardar
              </Button>
              <Flex h={"1px"} w={"90%"} bg={"gray.300"}></Flex>
            </Flex>
          )}

          <Flex
            w={"100%"}
            h={"50px"}
            alignItems={"center"}
            justifyContent={"center"}
            mt={"15px"}
            flexDir={"column"}
            _hover={{
              bg: "gray.200",
            }}
            cursor={"pointer"}
          >
            <Flex h={"1px"} w={"90%"} bg={"gray.300"}></Flex>
            <Link my={"8px"} href="/communities">
              <Flex>
                <Text>
                  <PeopleAltIcon />
                </Text>
                <Text ms={"10px"}>Comunidades</Text>
              </Flex>
            </Link>
            <Flex h={"1px"} w={"90%"} bg={"gray.300"}></Flex>
          </Flex>
          <Flex
            w={"100%"}
            h={"50px"}
            alignItems={"center"}
            justifyContent={"center"}
            mt={"15px"}
            flexDir={"column"}
            _hover={{
              bg: "gray.200",
            }}
            cursor={"pointer"}
            onClick={() => signOut("google")}
          >
            <Flex h={"1px"} w={"90%"} bg={"gray.300"}></Flex>
            <Flex my={"8px"}>
              <Text>
                <GoogleIcon />
              </Text>
              <Text ms={"10px"}>Cerrar sesion</Text>
            </Flex>
            <Flex h={"1px"} w={"90%"} bg={"gray.300"}></Flex>
          </Flex>
        </Flex>
      ) : (
        <Flex
          w={"100%"}
          h={"50px"}
          alignItems={"center"}
          justifyContent={"center"}
          mt={"15px"}
          flexDir={"column"}
          _hover={{
            bg: "gray.200",
          }}
          cursor={"pointer"}
          onClick={() => signIn("google")}
        >
          <Flex h={"1px"} w={"90%"} bg={"gray.300"}></Flex>
          <Flex my={"8px"}>
            <Text>
              <GoogleIcon />
            </Text>
            <Text ms={"10px"}>Inicia sesion con google</Text>
          </Flex>
          <Flex h={"1px"} w={"90%"} bg={"gray.300"}></Flex>
        </Flex>
      )}
    </Flex>
  );
};
