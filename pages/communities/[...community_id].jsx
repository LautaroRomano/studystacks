import Navbar from "../../components/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../../components/Post";
import CreatePost from "../../components/CreatePost";
import CommunityDashboard from '../../components/communities/CommunityDashboard'


export default function Home() {
  const router = useRouter();
  const [community_id, section_id] = router.query.community_id || [null, null];
  const { status, data } = useSession();
  const [userLoggin, setUserLogin] = useState(false);
  const [sectionSelected, setSectionSelected] = useState(null);
  const [postsList, setPosts] = useState([]);

  useEffect(() => {
    if (!section_id) return;
    setSectionSelected(section_id);
  }, [section_id]);

  useEffect(() => {
    if (!sectionSelected) return;
    getPosts();
  }, [sectionSelected]);

  const getPosts = () => {
    axios.get(`/api/post/section/${sectionSelected}`).then(({ data }) => {
      setPosts(data);
    });
  };

  return (
    <Flex
      bg="primaryWhite.500"
      w="100vw"
      h="100vh"
      flexDir={"column"}
      alignItems={"center"}
      overflowY={"scroll"}
    >
      <CommunityDashboard community_id={community_id} section_id={section_id} userLoggin={userLoggin} >
        <Navbar
          session={{ status, data }}
          userLoggin={userLoggin}
          setUserLogin={setUserLogin}
        />
        <CreatePost />
        {postsList.map((post) => (
          <Post data={post} key={post.post_id} userLoggin={userLoggin} />
        ))}
        <Flex mb={"50px"}></Flex>
      </CommunityDashboard>
    </Flex>
  );
}
