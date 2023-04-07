import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import CreatePost from "../components/CreatePost";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function Home({ posts }) {
  const { status, data } = useSession();
  const [userLoggin, setUserLogin] = useState(false);
  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    if (userLoggin) {
      axios.get(`api/post/user/${userLoggin.user_id}`).then(({ data }) => {
        setPostsList(data);
      });
    }
  }, [userLoggin]);

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
      <CreatePost />
      {postsList.map((post) => (
        <Post data={post} key={post.post_id} />
      ))}
    </Flex>
  );
}
