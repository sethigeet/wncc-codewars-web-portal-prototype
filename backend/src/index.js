import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/status", (req, res) => {
  res.json({ status: "up" });
});

const ROOMS = {};

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("create room", () => {
    const room = Math.random().toString(36).substring(7);
    console.log("create room", room);
    socket.join(room);
    io.to(socket.id).emit("room joined", room);
    ROOMS[room] = [];
  });

  socket.on("join room", (room) => {
    console.log("join room", room);
    if (io.sockets.adapter.rooms.get(room)?.size > 1) {
      io.to(socket.id).emit("room full", room);
      return;
    }

    socket.join(room);
    io.to(socket.id).emit("room joined", room);
  });

  socket.on("leave room", (room) => {
    console.log("leave room", room);
    socket.leave(room);
    if (io.sockets.adapter.rooms.get(room)?.size === 0) {
      delete ROOMS[room];
    }
  });

  socket.on("play move", (move) => {
    if (socket.rooms.length === 1) {
      io.to(socket.id).emit("not in room");
      return;
    }
    const playerRoom = [...socket.rooms.values()].find((v) => v.length === 6);

    ROOMS[playerRoom].push(move);
    if (ROOMS[playerRoom].length === 2) {
      io.to(playerRoom).emit("game over", ROOMS[playerRoom]);
      delete ROOMS[playerRoom];
    }
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
