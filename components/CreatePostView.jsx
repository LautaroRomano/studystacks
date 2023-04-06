import {
  Flex,
  Image,
  Text,
  Textarea,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
export default function Post() {
  return (
    <Flex
      w={["100vw", "80vw", "700px", "700px", "700px"]}
      bg="#fff"
      paddingBottom="14px"
      paddingX="14px"
      position="relative"
      flexDir={"column"}
    >
      <Flex mt={"85px"} mb={"15px"}>
        <Text
          letterSpacing=".4px"
          fontSize="18px"
          fontWeight="500"
          color="primaryGray.500"
        >
          Crear posteo
        </Text>
        <Select placeholder="Comunidades">
          <option>{"Fisica"}</option>
          <option>{"Analisis"}</option>
        </Select>
        <Select placeholder="Secciones">
          <option>{"Parciales"}</option>
          <option>{"Finales"}</option>
        </Select>
      </Flex>
      <Flex h={"1.5px"} w={"90%"} bg={"primaryGray.700"} margin={"auto"}></Flex>

      <Flex flexDir={"column"}>
        <Input
          fontSize="14px"
          color="primaryGray.300"
          marginTop="16px"
          lineHeight="1.7"
          placeholder="Escribe un titulo atractivo"
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
        <Button colorScheme="blue" size="sm" borderRadius={"15px"}>
          Publicar
        </Button>
      </Flex>
    </Flex>
  );
}
