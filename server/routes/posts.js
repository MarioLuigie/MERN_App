import express from "express";//express import

import { getPosts, createPost } from "../controllers/posts.js"

const router = express.Router();//create express Router instance/object for create routes

//GET request serving/handle
router.get("/", getPosts);
router.post("/", createPost);

export default router;

