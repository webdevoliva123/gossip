import mongoose from "mongoose";

export const CONNECT_DB = async () => {
    try {

        if (!process.env.MONGODB_URI) {
            console.error("MONGODB_URI is not defined in environment variables.");
            process.exit(1); // exit with failure
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // exit with failure

        //Status code 1 means failure, 0 means success. 
        //By convention, a non-zero exit code indicates that an error occurred. 
        // In this case, if the connection to MongoDB fails, we log the error and exit the process with a status code of 1 to indicate that there was a failure in connecting to the database.
    }
}