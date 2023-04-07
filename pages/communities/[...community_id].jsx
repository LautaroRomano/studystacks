import Navbar from "../../components/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Flex, Input, Button, Image, Text, Spacer } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../../components/Post";
import CreatePost from "../../components/CreatePost";
import DehazeIcon from "@mui/icons-material/Dehaze";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function Home() {
  const router = useRouter();
  const [community_id, section_id] = router.query.community_id;
  const { status, data } = useSession();
  const [userLoggin, setUserLogin] = useState(false);
  const [community, setCommunity] = useState({});
  const [sections, setSections] = useState([]);
  const [sectionSelected, setSectionSelected] = useState(null);
  const [postsList, setPosts] = useState([]);
  const [pertenezco, setPertenezco] = useState(false);
  const [viewTab, setViewTab] = useState(false);

  useEffect(() => {
    if (!userLoggin || !community_id) return;
    getCommunity();
    getSections();
    pertenezcoVerify();
  }, [userLoggin, community_id]);

  useEffect(() => {
    if (!section_id) return;
    setSectionSelected(section_id);
  }, [section_id]);

  useEffect(() => {
    if (!sectionSelected) return;
    getPosts();
  }, [sectionSelected]);

  const pertenezcoVerify = () => {
    axios
      .get(`/api/communities/user/${userLoggin.user_id}`)
      .then(({ data }) => {
        setPertenezco(
          data.find((com) => community_id === community_id) ? true : false
        );
      });
  };

  const entryCommunity = (communityId) => {
    axios
      .post(`/api/communities/entry`, {
        community_id: communityId,
        user_id: userLoggin.user_id,
      })
      .then(() => pertenezcoVerify());
  };

  const exitCommunity = (communityId) => {
    axios
      .patch(`/api/communities/entry`, {
        community_id: communityId,
        user_id: userLoggin.user_id,
      })
      .then(() => pertenezcoVerify());
  };
  const getCommunity = () => {
    axios.get(`/api/communities/${community_id}`).then(({ data }) => {
      setCommunity(data[0]);
    });
  };

  const getSections = () => {
    axios.get(`/api/section/community/${community_id}`).then(({ data }) => {
      setSections(data);
      if (!sectionSelected) setSectionSelected(data[0].section_id);
    });
  };

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
      <Navbar
        session={{ status, data }}
        userLoggin={userLoggin}
        setUserLogin={setUserLogin}
      />
      <Flex
        display={
          viewTab ? "none" : ["flex", "flex", "flex", "none", "none", "none"]
        }
        w={"50px"}
        h={"50px"}
        bg={"primaryGray.300"}
        borderRadius={"50%"}
        position={"fixed"}
        bottom={5}
        left={5}
        zIndex={100}
        color={"#fff"}
        alignItems={"center"}
        justifyContent={"center"}
        onClick={() => setViewTab(true)}
      >
        <DehazeIcon />
      </Flex>
      <Flex
        w={
          viewTab
            ? "50vw"
            : [
                "0vw",
                "0vw",
                "0vw",
                "calc((100vw - 700px)/2)",
                "calc((100vw - 750px)/2)",
                "calc((100vw - 750px)/2)",
              ]
        }
        display={
          viewTab ? "flex" : ["none", "none", "none", "flex", "flex", "flex"]
        }
        h={"100vh"}
        bg={"#fff"}
        position={"absolute"}
        left={0}
        top={0}
        g="#FFF"
        color={"primaryGray.500"}
        px={"15px"}
        py={"35px"}
        boxShadow={"0px 6px 9px -1px rgba(161,161,161,1)"}
        borderBottom={"1px solid #ababab"}
        zIndex="10"
        flexDir={"column"}
      >
        <Flex
          onClick={() => setViewTab(false)}
          display={
            viewTab ? "flex" : ["flex", "flex", "flex", "none", "none", "none"]
          }
          mt={"-15px"}
          mb={"5px"}
          bg={"primaryGray.700"}
          borderRadius={"5px"}
          p={"5px"}
          w={"30px"}
          h={"30px"}
          color="primaryGray.500"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <ArrowBackIosNewIcon />
        </Flex>
        <Image
          height="60px"
          width="60px"
          borderRadius="10%"
          objectFit="cover"
          src={"/images/msgIco.png"}
          alt=""
        />
        <Text
          fontSize={"17px"}
          color={"primaryGray.500"}
          fontWeight={"700"}
          mt={"25px"}
        >
          {community.community_name}
        </Text>
        <Text
          fontSize={"15px"}
          color={"primaryGray.500"}
          fontWeight={"400"}
          mt={"15px"}
          px={"5px"}
        >
          {community.community_description}
        </Text>
        {sections.map((sec) => (
          <Text
            key={sec.section_id}
            fontSize={"16px"}
            color={"primaryGray.500"}
            fontWeight={"600"}
            mt={"25px"}
            bg={sectionSelected === sec.section_id && "primaryGray.700"}
            _hover={{ bg: "primaryGray.700" }}
            py={"8px"}
            px={"15px"}
            cursor={"pointer"}
          >
            {sec.section_name}
          </Text>
        ))}
        <Spacer />
        <Flex>
          {!pertenezco ? (
            <Button
              colorScheme={"blue"}
              onClick={() => entryCommunity(community_id)}
              size="sm"
            >
              Unirme
            </Button>
          ) : (
            <Button
              colorScheme={"red"}
              onClick={() => exitCommunity(community_id)}
              size="sm"
            >
              Abandonar
            </Button>
          )}
        </Flex>
      </Flex>
      <CreatePost />
      {postsList.map((post) => (
        <Post data={post} key={post.post_id} userLoggin={userLoggin} />
      ))}
      <Flex mb={"50px"}></Flex>
    </Flex>
  );
}
