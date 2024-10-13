import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();
const users = {};

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

io.on("connection", (socket) => {
  console.log("New Client Connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    users[userId] = socket.id;
  }

  io.emit("onlineUsers", Object.keys(users));

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    delete users[userId];
    io.emit("onlineUsers", Object.keys(users));
  });
});

export { app, io, server };
