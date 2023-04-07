import { Flex, Text, Textarea, Input, Button, Link } from "@chakra-ui/react";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import axios from "axios";
import { useState } from "react";
export default function CreateCommunityView({ session, userLoggin }) {
  const [communityData, setCommunityData] = useState({});
  const [postSucces, setPostSucces] = useState(false);

  const handleChangeData = ({ target }) => {
    setCommunityData((data) => ({ ...data, [target.name]: target.value }));
  };

  const sendData = () => {
    const data = {
      community_name: communityData.community_name,
      community_description: communityData.community_description,
      creator_user_id: userLoggin.user_id,
    };
    axios.post("/api/communities", data).then(({ data }) => {
      if (data.succes) setPostSucces(true);
    });
  };

  return (
    <Flex
      w={["100vw", "80vw", "700px", "700px", "700px"]}
      bg="#fff"
      paddingBottom="14px"
      paddingX="14px"
      position="relative"
      flexDir={"column"}
    >
      {postSucces && (
        <Flex
          w={"100vw"}
          h={"100vh"}
          position={"fixed"}
          bg={"#0003"}
          zIndex={"1000"}
          top={"0"}
          left={"0"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Flex
            w={["100%", "100%", "400px", "450px"]}
            h={"100px"}
            bg={"#fff"}
            color={"primaryGray.500"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDir={"column"}
          >
            <Flex>
              <Text color={"succes.500"} fontSize={"18px"} h={"30px"}>
                <CheckCircleOutlineIcon />
              </Text>
              <Text fontSize={"18px"} h={"30px"} ms={"10px"}>
                Creado con exito
              </Text>
            </Flex>
            <Link href="/communities">
              <Button colorScheme="blue" size="sm">
                Volver
              </Button>
            </Link>
          </Flex>
        </Flex>
      )}
      {session.status !== "authenticated" ? (
        <Flex mt={"85px"} mb={"15px"} flexDir={"column"}>
          <Text
            letterSpacing=".4px"
            fontSize="18px"
            fontWeight="500"
            color="primaryGray.500"
          >
            Para crear una comunidad debes estar logueado
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
              Crear Comunidad
            </Text>
          </Flex>
          <Flex
            h={"1.5px"}
            w={"90%"}
            bg={"primaryGray.700"}
            margin={"auto"}
          ></Flex>

          <Flex flexDir={"column"}>
            <Text
              letterSpacing=".4px"
              fontSize="14px"
              fontWeight="500"
              color="primaryGray.500"
              marginTop="16px"
            >
              Nombre de la comunidad:
            </Text>
            <Input
              fontSize="14px"
              color="primaryGray.300"
              lineHeight="1.7"
              placeholder="Ingresa el nombre de la comunidad"
              name="community_name"
              value={communityData.community_name}
              onChange={handleChangeData}
            ></Input>

            <Text
              letterSpacing=".4px"
              fontSize="14px"
              fontWeight="500"
              color="primaryGray.500"
              marginTop="10px"
            >
              Detalla brevemente lo que encontraras en esta comunidad:
            </Text>
            <Textarea
              fontSize="14px"
              color="primaryGray.500"
              lineHeight="1.7"
              placeholder="Escribe un breve detalle de tu comunidad"
              h={"150px"}
              maxH={"200px"}
              name="community_description"
              value={communityData.community_description}
              onChange={handleChangeData}
            ></Textarea>

            <Flex
              border={"1px solid #ababab"}
              position={"relative"}
              borderRadius={"0 15px 15px 15px"}
              mt={"15px"}
              flexDir={"column"}
            >
              <Flex my={"5px"}></Flex>
              <Text
                fontSize="15px"
                color="primaryGray.500"
                marginTop="16px"
                lineHeight="1.7"
                position={"absolute"}
                top="-7"
                left={"7"}
                bg={"#fff"}
                px="3px"
              >
                Secciones
              </Text>
              <Flex
                w={"100%"}
                color="primaryGray.500"
                p={"10px"}
                alignItems={"center"}
              >
                <Text color="warning.500">
                  <HomeIcon />
                </Text>
                <Text
                  fontSize="14px"
                  color="primaryGray.500"
                  marginTop="5px"
                  lineHeight="1.7"
                  ms={"10px"}
                  mt={"-5px"}
                >
                  Inicio
                </Text>
              </Flex>
              <Flex
                w={"100%"}
                color="primaryGray.500"
                bg={"gray.100"}
                p={"10px"}
                alignItems={"center"}
                justifyContent={"center"}
                borderRadius={"0 0 15px 15px"}
                cursor={"pointer"}
                _hover={{
                  bg: "gray.200",
                }}
              >
                <Text color="warning.500">
                  <AddIcon />
                </Text>
                <Text
                  fontSize="15px"
                  color="primaryGray.200"
                  marginTop="5px"
                  lineHeight="1.7"
                  fontWeight={"600"}
                  ms={"10px"}
                  mt={"-5px"}
                >
                  Crear seccion
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex mt="20px" alignItems="center" justifyContent={"end"}>
            <Button
              colorScheme="blue"
              size="sm"
              borderRadius={"15px"}
              onClick={sendData}
            >
              Crear
            </Button>
          </Flex>
        </>
      )}
    </Flex>
  );
}
