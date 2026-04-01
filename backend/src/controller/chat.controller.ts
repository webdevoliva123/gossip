import type { Response } from "express"
import type { AuthRequest } from "../middleware/auth.middleware";
import { RETURNRS } from "../utils/global.utils";
import { Chat } from "../model/chat.model";


export const getChats = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;

        const chats = await Chat.find({ participants: userId })
        .populate("participants", "name email avatar")
        .populate("lastMessage")
        .sort({ lastMessageAt : -1 });

       const formattedChats = chats.map((chat) => {
        let otherParticipant = chat.participants.find((p) => p._id.toString() !== userId);

        return {
            id: chat._id,
            participant:otherParticipant,
            lastMessage: chat.lastMessage,
            lastMessageAt : chat.lastMessageAt,
            createdAt: chat.createdAt
        }
       })

       return RETURNRS({
        type: "success",
        res,
        route: req.originalUrl,
        message: "Chats retrieved successfully.",
        statusCode: 200,
        data: formattedChats
       })

    } catch (error) {
        return RETURNRS({
            type: "error",
            res,
            route: req.originalUrl,
            message: "Internal Server Error : An error occurred while fetching chats.",
            error,
            statusCode: 500
        })
    }
}


export const getOrCreateChat = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;
        const { participantId } = req.params;
        const participantIdStr = participantId as string
        
        if (!participantId) {
            return RETURNRS({
                type: "error",
                res,
                route: req.originalUrl,
                message: "Participant ID is required.",
                statusCode: 400
            })
        }


        let chat = await Chat.findOne({
            participants: { $all: [userId, participantIdStr] }
        })
        .populate("participants", "name email avatar")
        .populate("lastMessage")

        if (!chat) {
          let newChat = new Chat({
                participants: [userId, participantIdStr]
            })
            await newChat.save();
            chat = await newChat.populate("participants", "name email avatar")

        }

        const otherParticipant = chat.participants.find((p) => p._id.toString() !== userId);

        const formattedChat = {
            id: chat._id,
            participant: otherParticipant ?? null,
            lastMessage: chat.lastMessage,
            lastMessageAt : chat.lastMessageAt,
            createdAt: chat.createdAt
        }

        return RETURNRS({
            type: "success",
            res,
            route: req.originalUrl,
            message: "Chat retrieved successfully.",
            statusCode: 200,
            data: formattedChat
        })

    } catch (error) {
        return RETURNRS({
            type: "error",
            res,
            route: req.originalUrl,
            message: "Internal Server Error : An error occurred while fetching chats.",
            error,
            statusCode: 500
        })
    }
}