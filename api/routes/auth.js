import express from "express";

import * as controllers from "../controllers/auth.js";

const router = express.Router();

router.post("/signIn", controllers.signIn);
router.post("/signUp", controllers.signUp);
router.post("/signInGoogle", controllers.signInGoogle);

export default router;