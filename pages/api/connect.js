// use socket.io to make a websocket listener
// and send the data to the client
import { Server } from "socket.io";

export default function handler(req, res) {
  if (res.socket.server.io) {
    return res.status(200).json({ initialized: true, new: false, message: "Socket already connected" });
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  const onConnection = (socket) => {
    console.log("New client connected");
    socket.emit("newIncomingMessage", "Hello from the server");
  }

  io.on("connection", onConnection);
  res.status(200).json({ initialized: true, new: true, message: "New socket opened" });
}