import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const s3Client = new S3Client({
  region: 'eu-north-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_CODE,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const storage = multerS3({
  s3: s3Client,
  bucket: 'editorial-images',
  key: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now().toString()}${ext}`;
    cb(null, fileName);
  }
});

const upload = multer({ storage });

export default upload.array("files", 4) 

// req.files structure after multer 
// &&& [
//   [0]   {
//   [0]     fieldname: 'files',
//   [0]     originalname: '19437740_990411211062133_1680588564994978308_n.jpg',
//   [0]     encoding: '7bit',
//   [0]     mimetype: 'image/jpeg',
//   [0]     size: 472666,
//   [0]     bucket: 'editorial-images',
//   [0]     key: '1708619026630.jpg',
//   [0]     acl: 'private',
//   [0]     contentType: 'application/octet-stream',
//   [0]     contentDisposition: null,
//   [0]     contentEncoding: null,
//   [0]     storageClass: 'STANDARD',
//   [0]     serverSideEncryption: null,
//   [0]     metadata: undefined,
//   [0]     location: 'https://editorial-images.s3.eu-north-1.amazonaws.com/1708619026630.jpg',
//   [0]     etag: '"66286f8cd95bf7d456ad303bffecf38e"',
//   [0]     versionId: undefined
//   [0]   }
//   [0] ]
//   [0] files uploaded: [
//   [0]   'https://editorial-images.s3.eu-north-1.amazonaws.com/1708619026630.jpg'
  
//   [0] ]



