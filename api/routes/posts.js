import express from "express";//express import

import * as controllers from "../controllers/posts.js";
import postUpload from "../middlewares/postUpload.js";
import auth from "../middlewares/auth.js";

const router = express.Router();//create express Router instance/object for create routes

//GET request serving/handle
router.get("/:id", auth, controllers.getPost);
router.get("/", auth, controllers.getPosts);
router.get("/search", auth, controllers.getPostsBySearch);
//POST request serving/handle
router.post("/", auth, postUpload(), controllers.createPost);
router.patch("/:id", auth, controllers.updatePost);
router.patch("/:id/likePost", auth, controllers.likePost);
router.delete("/:id", auth, controllers.deletePost);

export default router;

