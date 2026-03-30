import express from "express";
import { authRoutes } from "./routes/auth.routes";
import { userRoutes } from "./routes/user.routes";
import { chatsRoutes } from "./routes/chats.routes";
import { messageRoutes } from "./routes/message.routes";
const app = express();

// middlewares
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello, World! Welcome to Gossip API 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/chats", chatsRoutes);

export default app;