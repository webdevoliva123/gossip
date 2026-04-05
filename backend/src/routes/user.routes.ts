import { Router } from "express"
import { protectedRoute } from "../middleware/auth.middleware";
import { getUsers } from "../controller/user.controller";
const router = Router();

router.get("/",protectedRoute, getUsers)

export const userRoutes = router;