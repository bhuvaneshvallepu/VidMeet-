import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/users.routes.js";
import { connectToSocket } from "./controllers/socketmanager.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

// Configure CORS
const corsOptions = {
    origin: "https://vidmeetfrontend.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
    credentials: true, // Allow credentials (e.g., cookies, authorization headers)
};

app.set("port", process.env.PORT || 8000);
app.use(cors(corsOptions));
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

app.get("/home", (req, res) => {
    return res.json({ "hello": "World" });
});

const start = async () => {
    try {
        const connectionDb = await mongoose.connect("mongodb+srv://bhuvaneshvallepu:bhuvi2468@cluster0.rhrttyq.mongodb.net/");
        console.log(`MONGO connected DB host: ${connectionDb.connection.host}`);
        
        server.listen(app.get("port"), () => {
            console.log(`Listening on port ${app.get("port")}`);
        });
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
};

start();