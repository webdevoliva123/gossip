import { Router } from "express";
import { protectedRoute } from "../middleware/auth.middleware";
import { getChatMessages } from "../controller/message.controller";

const router = Router();

router.get("/", protectedRoute,getChatMessages)



export default router