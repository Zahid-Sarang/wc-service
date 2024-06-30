import { createServer } from "node:http";
import { Server } from "socket.io";

const wsServer = createServer();

// todo: move origin to config file
const io = new Server(wsServer, {
  cors: { origin: "http://localhost:5173" },
});

io.on("connection", (socket) => {
  console.log("client connected", socket.id);

  socket.on("join", (data) => {
    socket.join(String(data.tenantId));
    socket.emit("join", { roomId: String(data.roomId) });
  });
});

export default { wsServer, io };
