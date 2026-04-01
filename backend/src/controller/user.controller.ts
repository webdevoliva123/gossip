import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
import { RETURNRS } from "../utils/global.utils";
import { User } from "../model/user.model";

export const getUsers = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;

        const users = await User.find({ _id: { $ne: userId } }).select("name email avatar").limit(50);

        return RETURNRS({
            type: "success",
            res,
            route: req.originalUrl,
            message: "Users retrieved successfully.",
            statusCode: 200,
            data: users
        })
    } catch (error) {
        return RETURNRS({
            type: "error",
            res,
            route: req.originalUrl,
            message: "Internal Server Error : An error occurred while fetching users.",
            error,
            statusCode: 500
        })
    }
}