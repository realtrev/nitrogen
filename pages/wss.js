import { useState, useEffect } from "react";
import io from "socket.io-client";

export default function WS() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // socket at
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    const socket = await fetch('/api/connect');
    console.log('Connected');

    socket = io();

    socket.on("newIncomingMessage", (msg) => {
      console.log(msg);
      setMessage(msg);
    });

    // on disconnect
    socket.on("disconnect", () => {
      console.log("Disconnected");
    });

    setSocket(socket);
  };

  return (
    <div className="w-screen h-screen bg-sub3">
      <h1>WebSocket</h1>
      <p>{message}</p>
    </div>
  );
}