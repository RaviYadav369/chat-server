const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const dev = process.env.NODE_ENV !== "production";

const server = express();
const httpServer = http.createServer(server, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
  },
});
const io = socketIo(httpServer);

server.get("/", (req, res) => {
  res.send("This is form server");
});

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("New client connected", socket.id);
  socket.on("connect", () => {
    console.log("Client disconnected");
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${PORT}`);
});
