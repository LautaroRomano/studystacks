import { Flex, Text, Button, Input, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useSession } from "next-auth/react";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

export default function Home() {
  const { status, data } = useSession();
  const [userLoggin, setUserLogin] = useState(false);
  const [communitiesList, setCommunitiesList] = useState([]);
  const [allCommunitiesList, setAllCommunitiesList] = useState([]);

  useEffect(() => {
    if (userLoggin) {
      getCommunities();
    } else {
      setCommunitiesList([]);
      setAllCommunitiesList([]);
    }
  }, [userLoggin]);

  const getCommunities = () => {
    axios
      .get(`/api/communities/user/${userLoggin.user_id}`)
      .then(({ data }) => {
        setCommunitiesList(data);
      });
    axios.get(`/api/communities`).then(({ data }) => {
      setAllCommunitiesList(data);
    });
  };

  const entryCommunity = (communityId) => {
    axios
      .post(`/api/communities/entry`, {
        community_id: communityId,
        user_id: userLoggin.user_id,
      })
      .then(({ data }) => {
        getCommunities();
      });
  };
  const exitCommunity = (communityId) => {
    axios
      .patch(`/api/communities/entry`, {
        community_id: communityId,
        user_id: userLoggin.user_id,
      })
      .then(({ data }) => {
        getCommunities();
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
        w={["100vw", "80vw", "700px", "700px", "700px"]}
        bg="#fff"
        paddingBottom="14px"
        paddingX="14px"
        position="relative"
        flexDir={"column"}
      >
        {status !== "authenticated" ? (
          <Flex mt={"85px"} mb={"15px"} flexDir={"column"}>
            <Text
              letterSpacing=".4px"
              fontSize="18px"
              fontWeight="500"
              color="primaryGray.500"
            >
              Para ver tus comunidades debes estar logueado
            </Text>
          </Flex>
        ) : (
          <>
            <Link href="/communities/create">
              <Flex
                mt={"85px"}
                mb={"15px"}
                w={"100%"}
                _hover={{ bg: "primaryGray.700" }}
                alignItems={"center"}
                justifyContent={"center"}
                py={"5px"}
                cursor={"pointer"}
              >
                <Text
                  letterSpacing=".4px"
                  fontSize="18px"
                  fontWeight="500"
                  color="primaryGray.500"
                >
                  Crear una comunidad
                </Text>
                <Flex
                  color={"#fff"}
                  bg={"blue.300"}
                  borderRadius={"50%"}
                  p="2px"
                  ms={"10px"}
                >
                  <AddIcon />
                </Flex>
              </Flex>
            </Link>
            <Flex mb={"15px"} flexDir={"column"}>
              <Text
                letterSpacing=".4px"
                fontSize="18px"
                fontWeight="500"
                color="primaryGray.500"
              >
                Mis comunidades
              </Text>
            </Flex>

            <Flex mb={"15px"} alignItems={"center"}>
              <Text
                letterSpacing=".4px"
                fontSize="18px"
                fontWeight="500"
                color="primaryGray.500"
              >
                Buscar
              </Text>
              <Input
                placeholder="Buscar por nombre"
                ms={"15px"}
                color={"primaryGray.500"}
              ></Input>
            </Flex>
            <Flex flexDir={"column"} maxH={"50vh"} overflowY={"scroll"}>
              {communitiesList.map((community) => {
                const ref = `/communities/${community.community_id}`;
                return (
                  <Link href={ref} mt={"5px"}>
                    <Flex
                      key={community.community_id}
                      color={"primaryGray.500"}
                      px={"60px"}
                      py={"10px"}
                      my={"10px"}
                      _hover={{ bg: "primaryGray.700" }}
                      cursor={"pointer"}
                    >
                      <Text>{community.community_name}</Text>
                    </Flex>
                  </Link>
                );
              })}
            </Flex>

            <Flex flexDir={"column"}></Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
}

export function Admin() {}
