import { Flex, Text, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useSession } from "next-auth/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import axios from "axios";

export default function Home() {
  const { status, data } = useSession();
  const [userLoggin, setUserLogin] = useState(false);
  const [communitiesList, setCommunitiesList] = useState([]);

  useEffect(() => {
    if (userLoggin)
      axios
        .get(`/api/communities/user/${userLoggin.user_id}`)
        .then(({ data }) => {
          setCommunitiesList(data);
        });
    else setCommunitiesList([]);
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
            <Flex mt={"85px"} mb={"15px"} flexDir={"column"}>
              <Text
                letterSpacing=".4px"
                fontSize="18px"
                fontWeight="500"
                color="primaryGray.500"
              >
                Mis comunidades
              </Text>
            </Flex>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Nombre</Th>
                  <Th>Descripcion</Th>
                  <Th>Acciones</Th>
                </Tr>
              </Thead>
              <Tbody>
                {communitiesList.map((community) => {
                  return (
                    <Tr key={community.community_id} color={"primaryGray.500"}>
                      <Td>{community.community_name}</Td>
                      <Td>{community.community_description}</Td>
                      <Td>
                        <Button colorScheme="blue" size="sm">
                          editar
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
            <Flex flexDir={"column"}></Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
}

export function Admin() {}
