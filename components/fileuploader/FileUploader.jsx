import { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { Flex, Text, Input } from "@chakra-ui/react";
import FileUploadIcon from "@mui/icons-material/FileUpload";

function FileUploader({ setFilesUploaded }) {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileUpload = async (acceptedFiles) => {
    const formData = new FormData();
    for (let i = 0; i < acceptedFiles.length; i++) {
      if (!selectedFiles.find((f) => f.name == acceptedFiles[i].name)) {
        setSelectedFiles((state) => [...state, acceptedFiles[i]]);

        formData.append("files", acceptedFiles[i]);
        try {
          const response = await axios.post("/api/uploadfiles", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log(response.data);
          setFilesUploaded((state) => [...state, ...response.data.files]);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <Flex flexDir={"column"} justifyContent={"center"} alignItems={"center"}>
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
        <Dropzone accept=".pdf" onDrop={handleFileUpload} multiple>
          {({ getRootProps, getInputProps }) => (
            <Flex {...getRootProps()}>
              <Input {...getInputProps()} />
              <p>
                Arrastra aquí archivos PDF o haz clic para seleccionar uno o
                varios.
              </p>
            </Flex>
          )}
        </Dropzone>
      </Flex>
    </Flex>
  );
}

export default FileUploader;
