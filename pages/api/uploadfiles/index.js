import fs from "fs";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await uploadFiles(req, res);
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const uploadFiles = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.uploadDir = "./public/pdf/";
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al procesar archivo");
        return;
      }

      const uploadedFiles = [];

      for (const key in files) {
        if (Object.hasOwnProperty.call(files, key)) {
          const file = files[key];
          const fileName = file.newFilename + ".pdf";
          const filePath = `${form.uploadDir}${fileName}`;

          await fs.promises.rename(file.filepath, filePath);
          uploadedFiles.push({ name: fileName, path: filePath, originalName:  file.originalFilename});
        }
      }

      res.status(200).send({ success: "Archivos cargados exitosamente", files: uploadedFiles });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error al procesar archivo");
  }
};
