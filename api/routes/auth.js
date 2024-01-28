import express from "express";

import * as controllers from "../controllers/auth.js";

const router = express.Router();

router.post("/signIn", controllers.signIn);
router.post("/signUp", controllers.signUp);

export default router;