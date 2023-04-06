import { Flex } from "@chakra-ui/react";
import Post from "../components/Post";
import CreatePost from "../components/CreatePost";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <Flex
      bg="primaryWhite.500"
      w="100vw"
      h="100vh"
      flexDir={"column"}
      alignItems={"center"}
      overflowY={"scroll"}
    >
      <Navbar />
      <CreatePost />
      <Post />
      <Post />
      <Post />
    </Flex>
  );
}
