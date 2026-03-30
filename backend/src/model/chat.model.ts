import mongoose, { mongo } from "mongoose";

export interface IChat extends mongoose.Document {
    participants: mongoose.Types.ObjectId[];
    lastMessage?: mongoose.Types.ObjectId;
    lastMessageAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const ChatSchema = new mongoose.Schema<IChat>({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: null
    },
    lastMessageAt: {
        type: Date,
        default :  Date.now  
    }
}, { timestamps: true });

export const Chat = mongoose.model<IChat>("Chat", ChatSchema);