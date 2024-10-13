import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { connectDB } from "./config/dbConfig.js";
import UserRouter from "./routes/user.route.js";
import MessageRouter from "./routes/message.route.js";
import { app, server } from "./socket/server.js";

config();
connectDB();
const PORT = process.env.PORT || 9000;

// const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", UserRouter);
app.use("/message", MessageRouter);
app.get("/", (_, res) => {
  res.status(200).json({ message: "Hello world" });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
