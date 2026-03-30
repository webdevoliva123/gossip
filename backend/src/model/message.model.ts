import mongoose, { Document } from "mongoose";


export interface IMessage extends Document  {
    chat: mongoose.Schema.Types.ObjectId;
    sender: mongoose.Schema.Types.ObjectId;
    text: string;
    createdAt: Date;
    updatedAt: Date;
}   

const MessageSchema = new  mongoose.Schema<IMessage>({
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        required: true,
        trim : true
    },
}, { timestamps: true });

MessageSchema.index({ chat: 1, createdAt: 1 });


export const Message = mongoose.model<IMessage>("Message", MessageSchema);