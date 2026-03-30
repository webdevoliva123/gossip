import app from "./src/app";
import { CONNECT_DB } from "./src/config/database.config";

CONNECT_DB().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port : ${PORT} 🚀`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database. Server not started.", error);
    process.exit(1); // exit with failure
});