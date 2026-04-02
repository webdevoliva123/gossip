import app from "./src/app";
import { CONNECT_DB } from "./src/config/database.config";
import {createServer} from "http";
import { initializeSocket } from "./src/utils/socket.utils";

const httpServer = createServer(app);


CONNECT_DB().then(() => {
    initializeSocket(httpServer);
    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT, () => {
        console.log(`Server is running on port : ${PORT} 🚀`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database. Server not started.", error);
    process.exit(1); // exit with failure
});