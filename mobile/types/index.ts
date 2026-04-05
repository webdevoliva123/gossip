export interface UserDType {
    _id: string,
    name: string,
    avatar: string,
    email: string,
}


export interface MessageDType {
    _id: string;
    chat: string;
    sender: UserDType;
    text: string;
    createdAt: string;
    updatedAt: string
}

export interface ChatLastMessageDType {
    _id: string;
    text: string;
    sender: UserDType;
    createdAt: string
}

export interface ChatDType {
    _id: string;
    participant: UserDType;
    lastMessage: string;
    lastMessageAt: string;
    createdAt: string
}