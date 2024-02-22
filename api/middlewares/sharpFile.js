import sharp from "sharp";
import { 
  S3Client, 
  GetObjectCommand, 
  PutObjectCommand 
} from "@aws-sdk/client-s3";
import path from "path";
import dotenv from "dotenv";

const sharpFile = async (req, res, next) => {

  try {
    // console.log("&&&", req.files);

    const originalFile = req.files[0];
  
    const thumbFileName = `${path.basename(originalFile.key, path.extname(originalFile.key))}-thumb.jpg`
  
    // console.log("UUU", thumbFileName);

    const s3Client = new S3Client({
      region: 'eu-north-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      }
    });

    const getObjectCommand = new GetObjectCommand({
      Bucket: originalFile.bucket,
      Key: originalFile.key,
    });

    const { Body } = await s3Client.send(getObjectCommand);

    // Utwórz bufor i przeczytaj dane ze strumienia
    const buffers = [];
    for await (const chunk of Body) {
      buffers.push(chunk);
    }

    // Połącz bufory w jeden bufor
    const fileBuffer = Buffer.concat(buffers);

    // Sprawdź, czy fileBuffer zawiera dane
    console.log('Buffer pliku:', fileBuffer);

    const thumbnailBuffer = await sharp(fileBuffer)
      .resize({ width: 400 }) // Zdefiniuj rozmiary miniaturki
      .toBuffer();

    console.log("THUMB BUFFER:", thumbnailBuffer);

    const putObjectCommand = new PutObjectCommand({
      Bucket: originalFile.bucket, // Zastąp to swoim bucketem na AWS S3
      Key: thumbFileName, // Zastąp to swoją ścieżką i nazwą pliku
      Body: thumbnailBuffer,
      ContentType: 'image/jpeg'
    });

    const data = await s3Client.send(putObjectCommand);
    
    console.log('Miniaturka przesłana do AWS S3:', data);

    // Tworzenie obiektu pliku dla miniaturki
    const thumbnailFile = {
      fieldname: 'files', // Dostosuj pole, jeśli potrzebujesz
      originalname: thumbFileName,
      encoding: '7bit',
      mimetype: 'image/jpeg',
      size: thumbnailBuffer.length,
      bucket: originalFile.bucket,
      key: thumbFileName,
      acl: 'private',
      contentType: 'application/octet-stream',
      contentDisposition: null,
      contentEncoding: null,
      storageClass: 'STANDARD',
      serverSideEncryption: null,
      metadata: undefined,
      location: `https://${originalFile.bucket}.s3.eu-north-1.amazonaws.com/${thumbFileName}`,
      etag: `"${Math.random().toString(36).substr(2, 9)}"`, // ETag dla unikalności
      versionId: undefined
    };

    req.files.unshift(thumbnailFile);

  } catch (err) {
    console.error("Problem z przetworzeniem pliku na miniaturkę:", err);
  }
  next();
}

export default sharpFile;