import { Router } from "express"
import { protectedRoute } from "../middleware/auth.middleware";
import { authCallback, getMe } from "../controller/auth.controller";
const router = Router();


router.get("/me",protectedRoute,getMe)
router.post("/callback",authCallback)

export const authRoutes = Router();