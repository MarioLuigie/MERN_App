import express from "express";//express import

import * as controllers from "../controllers/posts.js"

const router = express.Router();//create express Router instance/object for create routes

//GET request serving/handle
router.get("/", controllers.getPosts);
//POST request serving/handle
router.post("/", controllers.createPost);

export default router;

