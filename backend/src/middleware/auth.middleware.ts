import type { Request, Response, NextFunction } from "express";
import { getAuth, requireAuth } from "@clerk/express";
import { User } from "../model/user.model";
import { RETURNRS } from "../utils/global.utils";

export interface AuthRequest extends Request {  
    userId?: string; // This will hold the MongoDB _id of the authenticated user
}

export const protectedRoute = [
    requireAuth(),
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const { userId: clerkId } = getAuth(req);
            if (!clerkId) return RETURNRS({
                type: "failed",
                res,
                route: req.originalUrl,
                message: "Unauthorized access. No user ID found in the request.",
                statusCode: 401
            })

            // Check if the user exists in the database
            const user = await User.findOne({ clerkId });
            if (!user) return RETURNRS({
                type: "error",
                res,
                route: req.originalUrl,
                message: "Unauthorized access. User not found in the database.",
                statusCode: 401
            })

            req.userId = user._id.toString();
            next();
        } catch (error) {
            return RETURNRS({
                type: "error",
                res,
                route: req.originalUrl,
                message: "Internal Server Error : An error occurred during authentication.",
                statusCode: 500,
                error
            })
        }
    }
]

