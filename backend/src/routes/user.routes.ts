import { Router } from "express"
import { protectedRoute } from "../middleware/auth.middleware";
import { getUsers } from "../controller/user.controller";
const router = Router();

router.get("/users",protectedRoute, getUsers)

export default router