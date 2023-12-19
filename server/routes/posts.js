import express from "express";//express import
import multer from "multer";
import path from "path";

import * as controllers from "../controllers/posts.js"

const router = express.Router();//create express Router instance/object for create routes

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({ storage });

//GET request serving/handle
router.get("/", controllers.getPosts);
//POST request serving/handle
router.post("/", upload.array("files", 4), controllers.createPost);

export default router;

