import express from "express";
import path from 'path'
import { clerkMiddleware } from '@clerk/express'
import { authRoutes } from "./routes/auth.routes";
import { userRoutes } from "./routes/user.routes";
import { messageRoutes } from "./routes/message.routes";
import { chatsRoutes } from "./routes/chats.routes";
const app = express();

if (!process.env.CLERK_SECRET_KEY || !process.env.CLERK_PUBLISHABLE_KEY) {
    throw new Error('CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY must be defined in the environment variables');
}

// middlewares
app.use(express.json());
app.use(clerkMiddleware({
    secretKey: process.env.CLERK_SECRET_KEY!,   
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY!,
}));


app.get("/", (req, res) => {
    res.send("Hello, World! Welcome to Gossip API 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/chats", chatsRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../web/dist")))

    app.get("/{*}", (_,res) => {
        res.sendFile(path.join(__dirname, "../../web/dist/index.html"))
    })
}

export default app;