import {
  Flex,
  Text,
  Textarea,
  Input,
  Button,
  Link,
  Select,
  FormControl,
  Switch,
  FormLabel,
} from "@chakra-ui/react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import axios from "axios";
import { useState, useEffect } from "react";
export default function CreateCommunityView({ session, userLoggin }) {
  const [communityData, setCommunityData] = useState({});
  const [postSucces, setPostSucces] = useState(false);
  const [universityOn, setUniversityOn] = useState(false);
  const [universities, setUniversities] = useState({});

  const handleChangeData = ({ target }) => {
    setCommunityData((data) => ({ ...data, [target.name]: target.value }));
  };

  const sendData = () => {
    const data = {
      community_name: communityData.community_name,
      community_description: communityData.community_description,
      creator_user_id: userLoggin.user_id,
      university_id: communityData.university_id,
      career_id: communityData.career_id,
      commission_id: communityData.commission_id,
    };
    axios.post("/api/communities", data).then(({ data }) => {
      if (data.succes) setPostSucces(true);
    });
  };

  useEffect(() => {
    axios.get("/api/universities").then(({ data }) => {
      setUniversities(data);
    });
  }, []);

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

            <FormControl
              letterSpacing=".4px"
              fontSize="14px"
              fontWeight="500"
              color="primaryGray.500"
              marginTop="10px"
              display={"flex"}
              alignItems={"center"}
            >
              <FormLabel htmlFor="universityOn" mb="0">
                Tu comunidad pertenece a una universidad?
              </FormLabel>
              <Switch
                id="universityOn"
                mt={"5px"}
                value={universityOn}
                onChange={({ target }) =>
                  setUniversityOn(
                    target.value === "false"
                      ? true
                      : target.value === "true"
                      ? false
                      : null
                  )
                }
              />
            </FormControl>
            {universityOn && (
              <>
                <Text
                  letterSpacing=".4px"
                  fontSize="14px"
                  fontWeight="500"
                  color="primaryGray.500"
                  marginTop="10px"
                >
                  Universidad:
                </Text>
                <Select
                  value={communityData.university_id}
                  name="university_id"
                  onChange={handleChangeData}
                  color={"primaryGray.500"}
                >
                  <option value={0}>{"Selecciona una universidad"}</option>
                  {universities.universities &&
                    universities.universities.map((uni) => (
                      <option value={uni.university_id} key={uni.university_id}>
                        {uni.university_name}
                      </option>
                    ))}
                </Select>
                <Text
                  letterSpacing=".4px"
                  fontSize="14px"
                  fontWeight="500"
                  color="primaryGray.500"
                  marginTop="10px"
                >
                  Carrera:
                </Text>
                <Select
                  color={"primaryGray.500"}
                  value={communityData.career_id}
                  name="career_id"
                  onChange={handleChangeData}
                >
                  <option value={0}>{"Selecciona una carrera"}</option>
                  {universities.careers &&
                    universities.careers
                      .filter(
                        (c) => c.university_id == communityData.university_id
                      )
                      .map((career) => (
                        <option value={career.career_id} key={career.career_id}>
                          {career.career_name}
                        </option>
                      ))}
                </Select>
                <Text
                  letterSpacing=".4px"
                  fontSize="14px"
                  fontWeight="500"
                  color="primaryGray.500"
                  marginTop="10px"
                >
                  Comision/Curso:
                </Text>
                <Select
                  color={"primaryGray.500"}
                  value={communityData.commission_id}
                  name="commission_id"
                  onChange={handleChangeData}
                >
                  <option value={0}>{"Selecciona una comision/curso"}</option>
                  {universities.commissions &&
                    universities.commissions
                      .filter((c) => c.career_id == communityData.career_id)
                      .map((com) => (
                        <option
                          value={com.commission_id}
                          key={com.commission_id}
                        >
                          {com.commission_name}
                        </option>
                      ))}
                </Select>
              </>
            )}
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
