import express from "express";//express import

import * as controllers from "../controllers/posts.js";
import postUpload from "../middlewares/postUpload.js";
import auth from "../middlewares/auth.js";
import sharpFile from "../middlewares/sharpFile.js";

const router = express.Router();//create express Router instance/object for create routes

//GET request serving/handle
router.post("/search", auth, controllers.getPosts);
// router.get("/search", auth, controllers.getPostsBySearch);
router.get("/:id", auth, controllers.getPost);
//POST request serving/handle
router.post("/", auth, postUpload, sharpFile, controllers.createPost);
router.patch("/:id", auth, controllers.updatePost);
router.patch("/:id/likePost", auth, controllers.likePost);
router.patch("/:id/commentPost", auth, controllers.commentPost);
router.delete("/:postId/comments/:commentId", auth, controllers.deleteComment);
router.delete("/:id", auth, controllers.deletePost);

export default router;

