import { Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import CreatePostView from "../../components/CreatePostView";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { status, data } = useSession();
  const [userLoggin, setUserLogin] = useState(false);

  if(status === "loading"){
    return <div>
      Loading...
    </div>
  }
  if(!data){
    signIn();
    return null;
  }
  

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
