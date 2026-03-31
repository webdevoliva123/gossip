import type { Response, Request } from "express";
import { RETURNRS } from "../utils/global.utils";
import type { AuthRequest } from "../middleware/auth.middleware";
import { User } from "../model/user.model";
import { clerkClient, getAuth } from "@clerk/express";



export const getMe = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) {
            return RETURNRS({
                type: "error",
                res,
                route: req.originalUrl,
                message: "User not found.",
                statusCode: 404
            })
        }

     return RETURNRS({
            type: "success",
            res,
            route: req.originalUrl,
            message: "User data retrieved successfully.",
            statusCode: 200,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatarUrl: user.avatar
            }
        })

    } catch (error) {
        console.error("Error in getMe:", error);
        return RETURNRS({
            type: "error",
            res,
            route: req.originalUrl,
            message: "Internal Server Error : An error occurred while fetching user data.",
            statusCode: 500
        })
    }
}

export const authCallback = async (req: Request, res: Response) => {
    try {
        const {userId : clerkId}  = getAuth(req);

        if (!clerkId) return RETURNRS({
            type: "failed",
            res,
            route: req.originalUrl,
            message: "Unauthorized access. No user ID found in the request.",
            statusCode: 401
        })

        let user = await User.findOne({ clerkId });

        if (!user) {
            const clerkUser = await clerkClient.users.getUser(clerkId);

            // Validate email exists
            if (!clerkUser.emailAddresses || clerkUser.emailAddresses.length === 0 || !clerkUser.emailAddresses[0]?.emailAddress) {
                return RETURNRS({
                    type: "failed",
                    res,
                    route: req.originalUrl,
                    message: "Email address not found in Clerk user record.",
                    statusCode: 400
                })
            }

            const email = clerkUser.emailAddresses[0].emailAddress;
            const name = clerkUser.firstName ? `${clerkUser.firstName} ${clerkUser.lastName || ""}`.trim() : email.split("@")[0];

            user = await User.create({
                clerkId,
                name,
                email,
                avatar : clerkUser.imageUrl || ""
             })
        }

        return RETURNRS({
            type: "success",
            res,
            route: req.originalUrl,
            message: "Authentication successful.",
            statusCode: 200,
            data: {
                id: user._id,
                name: user.name,
                avatarUrl: user.avatar
            }
        })

    } catch (error) {
        console.error("Error in authCallback:", error);
        return RETURNRS({
            type: "error",
            res,
            route: req.originalUrl,
            message: "Internal Server Error : An error occurred during authentication callback.",
            statusCode: 500
        })
    }
}