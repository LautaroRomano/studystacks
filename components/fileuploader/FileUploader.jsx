import { useState } from "react";
import Dropzone from "react-dropzone";

function FileUploader() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (acceptedFiles) => {
    // Manejar la carga del archivo
    const file = acceptedFiles[0];
    setSelectedFile(file);
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
