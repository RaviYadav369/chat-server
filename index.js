const express = require("express");
const http = require("http");
const {Server} = require("socket.io");

const dev = process.env.NODE_ENV !== "production";

const server = express();
const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
  },
});

server.get("/", (req, res) => {
  res.send("This is form server");
});

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("New client connected", socket.id);
  socket.on("connect", () => {
    console.log("Client disconnected");
  });

  socket.on("myevent",(data)=>{
    socket.emit("resevent","Hello client");
  })
});

// Start the server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${PORT}`);
});
