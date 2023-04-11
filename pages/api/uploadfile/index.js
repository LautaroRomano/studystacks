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
      return await uploadFile(req, res);
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const uploadFile = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.uploadDir = "./public/";
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al procesar archivo");
        return;
      }
      const { filepath: path } = files.file;
      const fileName = files.file.newFilename + ".pdf";
      const filePath = `${form.uploadDir}pdf/${fileName}`;

      fs.rename(path, filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error al mover archivo");
          return;
        }

        res
          .status(200)
          .send({ succes: "Archivo cargado exitosamente", filePath: filePath });
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error al procesar archivo");
  }
};
