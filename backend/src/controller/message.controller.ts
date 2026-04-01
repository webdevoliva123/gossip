import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
import { RETURNRS } from "../utils/global.utils";
import { Chat } from "../model/chat.model";
import { Message } from "../model/message.model";
import  mongoose, { Types } from "mongoose";


export const getChatMessages = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;
        const { chatId } = req.params;
        let chatIdStr  = chatId as string

        if (!chatId) {
            return RETURNRS({
                type: "error",
                res,
                route: req.originalUrl,
                message: "Chat ID is required.",
                statusCode: 400
            });
        }

        const chat = await Chat.findOne({
            _id: new mongoose.Types.ObjectId(chatIdStr),
            participants : userId
        })

        if (!chat) {
            return RETURNRS({
                type: "error",
                res,
                route: req.originalUrl,
                message: "Chat not found.",
                statusCode: 404
            });
        }


        const messages = await Message.find({chat: new mongoose.Types.ObjectId(chatIdStr) as any }).populate("sender", "name email avatar").sort({ createdAt: 1 });

        return RETURNRS({
            type: "success",
            res,
            route: req.originalUrl,
            message: "Chat messages retrieved successfully.",
            statusCode: 200,
            data: messages
        })
    }
    catch (error) {
        return RETURNRS({
            type: "error",
            res,
            route: req.originalUrl,
            message: "Internal Server Error : An error occurred while fetching chat messages.",
            error,
            statusCode: 500
        })
    }
}