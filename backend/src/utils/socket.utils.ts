import { Socket, Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";
import { verifyToken } from "@clerk/express";
import { User } from "../model/user.model";
import { Message } from "../model/message.model";
import { Chat } from "../model/chat.model";
import mongoose, { Types } from "mongoose";

export interface AuthenticatedSocket extends Socket {
    userId: string
}

// this will store the online users in memory, we can use Redis or any other in-memory database for production
export const onlineUsers: Map<string, string> = new Map() // userId -> socketId

export const initializeSocket = (httpServer: HttpServer) => {

    const allowedOrigins: string[] = [
        "http://localhost:8081", //for EXPO
        "http://localhost:5173", //for VITE
        process.env.FRONTED_URL as string,
        process.env.APP_URL as string
    ]

    const io = new SocketServer(httpServer, {
        cors: {
            origin: allowedOrigins
        }
    })


    // verify socket connection - if the user is authenticated, we will store the user id in the socket 

    io.use(async (socket, next) => {
        const token = socket.handshake.auth.token // this was client will send

        if (!token) {
            return next(new Error("Authentication error : No token provided"))
        }

        try {
            const session = await verifyToken(token, { secretKey: process.env.CLERK_SECRET_KEY! })
            const clerkId = session.sub

            const user = await User.findOne({ clerkId })

            if (!user) {
                return next(new Error("Authentication error : User not found"))
            }

            (socket as AuthenticatedSocket).userId = user._id.toString() // store the user id in the socket for future use

            next()

        } catch (err) {
            next(new Error("Authentication error : Invalid token"))
        }
    })

    io.on("connection", (socket) => {
        const userId = (socket as AuthenticatedSocket).userId

        //  send the list of currenly online users to the newly connected user

        socket.emit("online-users", { userIds: Array.from(onlineUsers.keys()) })

        onlineUsers.set(userId, socket.id) // add the user to the online users map

        // notify all other users that a new user has come online
        socket.broadcast.emit("user-online", { userId })

        // newly connected user will join a private room with their user id, this will be used to see the activity

        socket.join(`user:${userId}`)

        socket.on("join-chat", (chatId: string) => {
            socket.join(`chat:${chatId}`)
        })

        socket.on("leave-chat", (chatId: string) => {
            socket.leave(`chat:${chatId}`)
        })

        // handle sending messages
        socket.on("send-message", async (data: { chatId: string, text: string }) => {
            try {
                const { chatId, text } = data

                const chat = await Chat.findOne({
                    _id: new Types.ObjectId(chatId),
                    participants: {
                        $in: [userId] // check if the user is a participant of the chat
                    }
                })

                if (!chat) {
                    return socket.emit("socket-error", { message: "Chat not found" })
                }

                const message = await Message.create({
                    chat: new mongoose.Types.ObjectId(chatId),
                    sender: new mongoose.Types.ObjectId(userId),
                    text,
                });

                chat.lastMessage = message._id
                chat.lastMessageAt = new Date()
                await chat.save()

                await message.populate("sender", "name email profilePicture") // populate the sender field with user details

                io.to(`chat:${chatId}`).emit("new-message", message) // emit the new message to  participants of the chat

                // also emit the new message to all participants of the chat who are online, this will be used to show the new message notification in the chat list
                for (const participantId of chat.participants) {
                    io.to(`user:${participantId.toString()}`).emit("new-message", message) // notify all participants about the new message in the chat
                }
            } catch (err) {
                socket.emit("socket-error", { message: "Failed to send message" })
            }
        })


        // handle typing event
        socket.on("typing",async(data) => {

        })

        // 
        socket.on("disconnect", () => {
            onlineUsers.delete(userId) // remove the user from the online users map

            // notify all other users that a user has gone offline
            socket.broadcast.emit("user-offline", { userId })
        })

    })

    return io
}
