import {
  Flex,
  Image,
  Text,
  Input,
  Button,
  Link,
  Spacer,
} from "@chakra-ui/react";
import GoogleIcon from "@mui/icons-material/Google";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import axios from "axios";
import { signIn, signOut , session} from "next-auth/react";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Search from "./Search";
import Register from "./user/Register";
import { useRouter } from "next/router";


export default function Navbar({ session, userLoggin, setUserLogin }) {
  const [viewUserSettings, setViewUserSettings] = useState(false);
  const [search, setSearch] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (session && session.status === "authenticated" && !userLoggin) {
      const email = session.data.user.email;
      axios.get(`/api/login/isloggedin/${email}`).then(({ data }) => {
        if (data.length > 0) setUserLogin(data[0]);
      });
    }
  }, [session]);

  const handleSearchClick = () => {
    setSearch(true)
  }

  const handleLoginClick = () => {
    localStorage.setItem("callbackUrl" , router.asPath)
    signIn("google")
  }


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
      {search && (
        <Search
          session={session}
          userLoggin={userLoggin}
          closedModal={() => setSearch(false)}
        />
      )}
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
        <Flex
          position={"relative"}
          display={["none", "none", "flex", "flex", "flex"]}
        >
        { session && session.status === 'authenticated' 
        ? 
           <Input
              placeholder="Buscar..."
              value=""
              onClick={handleSearchClick}
              readOnly
            ></Input>
        : 
          <Input
            placeholder="Buscar..."
            value=""
            onClick={()=>{router.push("/login")}}
          />
        }
          
          <Flex position={"absolute"} right={1} top={"2"}>
            <SearchIcon />
          </Flex>
        </Flex>
        <Flex
          position={"relative"}
          display={["flex", "flex", "none", "none", "none"]}
        >
          <Flex
            bg={"primaryGray.700"}
            p={"6px"}
            borderRadius={"10%"}
            onClick={() => setSearch(true)}
          >
            <SearchIcon />
          </Flex>
        </Flex>
      </Flex>

      {viewUserSettings && (
        <UserSettings
          session={session}
          userLoggin={userLoggin}
          setUserLogin={setUserLogin}
          setViewUserSettings={setViewUserSettings}
        />
      )}
      <Spacer></Spacer>
      {session && session.status === "authenticated" && (
        <Text
          letterSpacing=".4px"
          fontSize="14px"
          fontWeight="500"
          color="primaryGray.500"
          me={"5px"}
        >
          @{userLoggin.username}
        </Text>
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

const UserSettings = ({
  session,
  userLoggin,
  setUserLogin,
  setViewUserSettings,
}) => {
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
          >
            {!userLoggin && (
              <Register
                session={session}
                userLoggin={userLoggin}
                setUserLogin={setUserLogin}
                setViewUserSettings={setViewUserSettings}
              />
            )}

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
