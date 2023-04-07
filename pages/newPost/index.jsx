import { Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import CreatePostView from "../../components/CreatePostView";
import { useSession } from "next-auth/react";

export default function Home() {
  const { status, data } = useSession();
  const [userLoggin, setUserLogin] = useState(false);
  

  return (
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
      <CreatePostView session={{ status, data }} userLoggin={userLoggin} />
    </Flex>
  );
}

export function Admin() {}
