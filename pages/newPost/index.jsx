import { Flex, Text } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import CreatePostView from "../../components/CreatePostView";
import { useSession } from "next-auth/react";

export default function Home() {
  const { status, data } = useSession();

  return (
    <Flex
      bg="primaryWhite.500"
      w="100vw"
      h="100vh"
      flexDir={"column"}
      alignItems={"center"}
      overflowY={"scroll"}
    >
      <Navbar session={{ status, data }} />
      <CreatePostView session={{ status, data }} />
    </Flex>
  );
}

export function Admin() {}
