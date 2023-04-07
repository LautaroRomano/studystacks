import {
  Flex,
  Image,
  Text,
  Textarea,
  Input,
  Button,
  Select,
  Link 
} from "@chakra-ui/react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Post({ session, userLoggin }) {
  const [communitiesList, setCommunitiesList] = useState([]);
  const [sectionsList, setSectionsList] = useState([]);
  const [postData, setPostData] = useState({});
  const [succes, setSucces] = useState(false);

  useEffect(() => {
    if (userLoggin)
      axios
        .get(`/api/communities/user/${userLoggin.user_id}`)
        .then(({ data }) => {
          setCommunitiesList(data);
        });
    else setCommunitiesList([]);
  }, [userLoggin]);

  const getSection = (communityId) => {
    axios.get(`/api/section/community/${communityId}`).then(({ data }) => {
      setSectionsList(data);
    });
  };
  const handleChange = ({ target }) => {
    if (target.name === "community_id" && target.value)
      getSection(target.value);
    setPostData((data) => ({
      ...data,
      [target.name]: target.value,
    }));
  };

  const handlePostData = () => {
    const data = {
      post_title: postData.post_title,
      post_body: postData.post_body,
      creator_user_id: userLoggin.user_id,
      community_id: postData.community_id,
      section_id: postData.section_id,
    };
    axios.post(`/api/post`, data).then(({ data }) => {
      if (data.succes) setSucces(true);
      else setSucces(false);
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
      {succes && (
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
                Post creado con exito
              </Text>
            </Flex>
            <Link href="/">
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
            Para crear un posteo debe iniciar session
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
              Crear posteo
            </Text>
            <Flex>
              <Select
                placeholder="Comunidades"
                color="primaryGray.500"
                onChange={handleChange}
                name="community_id"
                value={postData.community_id}
              >
                {communitiesList.map((community) => (
                  <option
                    key={community.community_id}
                    value={community.community_id}
                  >
                    {community.community_name}
                  </option>
                ))}
              </Select>
              <Select
                placeholder="Secciones"
                color="primaryGray.500"
                name="section_id"
                value={postData.section_id}
                onChange={handleChange}
              >
                {sectionsList.map((section) => (
                  <option key={section.section_id} value={section.section_id}>
                    {section.section_name}
                  </option>
                ))}
              </Select>
            </Flex>
          </Flex>
          <Flex
            h={"1.5px"}
            w={"90%"}
            bg={"primaryGray.700"}
            margin={"auto"}
          ></Flex>

          <Flex flexDir={"column"}>
            <Input
              fontSize="14px"
              color="primaryGray.300"
              marginTop="16px"
              lineHeight="1.7"
              placeholder="Escribe un titulo atractivo"
              name="post_title"
              value={postData.post_title}
              onChange={handleChange}
            ></Input>

            <Flex>
              <Textarea
                fontSize="14px"
                color="primaryGray.500"
                marginTop="10px"
                lineHeight="1.7"
                placeholder="Escribe aqui lo que quieras publicar"
                h={"300px"}
                maxH={"300px"}
                name="post_body"
                value={postData.post_body}
                onChange={handleChange}
              ></Textarea>
            </Flex>

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
                Archivos adjuntos
              </Text>
              <Flex
                w={"100%"}
                color="primaryGray.500"
                p={"10px"}
                alignItems={"center"}
              >
                <Text color="warning.500">
                  <PictureAsPdfIcon />
                </Text>
                <Text
                  fontSize="14px"
                  color="primaryGray.500"
                  marginTop="5px"
                  lineHeight="1.7"
                  ms={"10px"}
                  mt={"-5px"}
                >
                  Enanos albinos link.pdf
                </Text>
              </Flex>
              <Flex
                w={"100%"}
                color="primaryGray.500"
                p={"10px"}
                alignItems={"center"}
              >
                <Text color="warning.500">
                  <PictureAsPdfIcon />
                </Text>
                <Text
                  fontSize="14px"
                  color="primaryGray.500"
                  marginTop="5px"
                  lineHeight="1.7"
                  ms={"10px"}
                  mt={"-5px"}
                >
                  Parcial 1 Fisica 2.pdf
                </Text>
              </Flex>
              <Flex
                w={"100%"}
                color="primaryGray.500"
                p={"10px"}
                alignItems={"center"}
              >
                <Text color="warning.500">
                  <PictureAsPdfIcon />
                </Text>
                <Text
                  fontSize="14px"
                  color="primaryGray.500"
                  marginTop="5px"
                  lineHeight="1.7"
                  ms={"10px"}
                  mt={"-5px"}
                >
                  Parcial 2 Fisica 2.pdf
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
                  <FileUploadIcon />
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
                  Subir PDF
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex mt="20px" alignItems="center" justifyContent={"end"}>
            <Button
              colorScheme="blue"
              size="sm"
              borderRadius={"15px"}
              onClick={handlePostData}
            >
              Publicar
            </Button>
          </Flex>
        </>
      )}
    </Flex>
  );
}
