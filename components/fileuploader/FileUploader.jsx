import { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

function FileUploader() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/uploadfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dropzone accept=".pdf" onDrop={handleFileUpload}>
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {selectedFile ? (
            <p>Archivo seleccionado: {selectedFile.name}</p>
          ) : (
            <p>Arrastra aquí un archivo PDF o haz clic para seleccionar uno.</p>
          )}
        </div>
      )}
    </Dropzone>
  );
}

export default FileUploader;
