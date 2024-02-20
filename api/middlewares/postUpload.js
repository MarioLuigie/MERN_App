import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const s3Client = new S3Client({
  region: 'eu-north-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const storage = multerS3({
  s3: s3Client,
  bucket: 'editorial-images',
  // acl: 'public-read',
  key: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now().toString()}${ext}`;
    cb(null, fileName);
  }
});

const upload = multer({ storage });

const postUpload = () => (
  upload.array("files", 4)
);

export default postUpload;

// aws.config.update({
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   region: 'eu-north-1'
// });

// const s3 = new aws.S3();

// const storage = multerS3({
//   s3: s3,
//   bucket: 'editorial-images',
//   acl: 'public-read',
//   filename: (req, file, cb) => {
//     cb(null, Date.now().toString() + path.extname(file.originalname));
//   }
// })

// const upload = multer({ storage });

// const postUpload = () => (
//   upload.array("files", 4)
// )

// export default postUpload;

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// })

// const upload = multer({ storage });

// const postUpload = () => (
//   upload.array("files", 4)
// )
