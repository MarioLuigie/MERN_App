import express from "express";//express import

import * as controllers from "../controllers/posts.js";
import postUpload from "../middlewares/postUpload.js";

const router = express.Router();//create express Router instance/object for create routes

//GET request serving/handle
router.get("/", controllers.getPosts);
//POST request serving/handle
router.post("/", postUpload(), controllers.createPost);
router.patch("/:id", controllers.updatePost);
router.patch("/:id/likePost", controllers.likePost);
router.delete("/:id", controllers.deletePost);

export default router;

