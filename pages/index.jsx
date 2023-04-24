import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import CreatePost from "../components/CreatePost";
import Navbar from "../components/navbar/Navbar";
import NavbarBootom from "../components/navbar/NavbarBootom";
import { useSession } from "next-auth/react";
import axios from "axios";
import Head from "next/head";
import GoogleIcon from "@mui/icons-material/Google";
import Register from '../components/user/Register'
import { signIn, signOut } from "next-auth/react";

export default function Home({ posts }) {
  const { status, data } = useSession();
  const [userLoggin, setUserLogin] = useState(false);
  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    if (userLoggin) {
      axios.get(`api/post/user/${userLoggin.user_id}`).then(({ data }) => {
        setPostsList(data);
        if (data.length === 0)
          axios.get(`api/post/relevants`).then(({ data }) => {
            setPostsList(data);
          });
      });
    }
  }, [userLoggin]);

  return (
    <>
      <Head>
        <title>StudyStacks</title>
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Flex
        bg="primaryWhite.500"
        w="100vw"
        h="100vh"
        flexDir={"column"}
        alignItems={"center"}
        overflowY={"scroll"}
      >
        <Navbar
          session={{ status, data }}
          userLoggin={userLoggin}
          setUserLogin={setUserLogin}
        />
        <NavbarBootom userLoggin={userLoggin}/>
        {
          userLoggin && (
            <CreatePost />
          )
        }
        {postsList.map((post) => (
          <Post data={post} key={post.post_id} userLoggin={userLoggin} />
        ))}
        {
          !userLoggin && (
            <UserSettings session={{ status, data }} userLoggin={userLoggin} setUserLogin={setUserLogin} />
          )
        }
      </Flex>
    </>
  );
}

const UserSettings = ({ session, userLoggin, setUserLogin }) => {

  return (
    <Flex
      w={["100vw", "80vw", "700px", "700px", "700px"]}
      bg="#fff"
      paddingBottom="14px"
      paddingX="14px"
      position="relative"
      color={"primaryGray.500"}
      alignItems={"center"}
      p={"15px"}
      mt={"65px"}
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
            {!userLoggin && <Register session={session} userLoggin={userLoggin} setUserLogin={setUserLogin} setViewUserSettings={() => { }} notClosed={true} />}
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
