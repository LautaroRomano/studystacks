import AWS from "aws-sdk";
import formidable from "formidable";
import fs from "fs";

//configurar AWS con las claves de acceso
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY || 'AKIAR5YFNPEHDDYZFH4K',
  secretAccessKey: process.env.AWS_SECRET_KEY || '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',
  region: 'sa-east-1'
});

// Crear instancia de S3
const s3 = new AWS.S3();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      await uploadFiles(req, res);
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}

const uploadFiles = async (req, res) => {

  const form = new formidable.IncomingForm();

  try {

    form.multiples = true;
    form.maxFileSize = 10 * 1024 * 1024; // límite de tamaño del archivo en bytes
    form.parse(req, async (err, fields, files) => {
      const file = files.files;
      if (err) throw err;

      const params = {
        Bucket: 'studystacksfiles',
        Key: file.newFilename+'.pdf',
        Body: fs.createReadStream(file.filepath),
        ACL: 'public-read'
      };

      s3.upload(params, function (err, data) {
        if (err) throw err;
        const updateFile = { name: file.newFilename, path: data.Location, originalName: file.originalFilename }
        res.status(200).send({ success: "Archivos cargados exitosamente", files: [updateFile] });
      });

    });

  } catch (err) {
    console.log(err);
    res.status(500).send({ ...err, msg: "Error al procesar archivo", files: [] });
  }
};
