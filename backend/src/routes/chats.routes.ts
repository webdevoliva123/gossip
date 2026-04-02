import { Router } from "express";
import { protectedRoute } from "../middleware/auth.middleware";
import { getChats, getOrCreateChat } from "../controller/chat.controller";

const router = Router();
router.use(protectedRoute)

router.get("/", getChats)
router.post("/with/:participantId", getOrCreateChat)


export const chatsRoutes = router;