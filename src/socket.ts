import { createServer } from "node:http";
import { Server } from "socket.io";
import config from "config";

const wsServer = createServer();

const ALLOWED_DOMAINS = [
  config.get<string>("frontend.clientUI"),
  config.get<string>("frontend.adminUI"),
];

// todo: move origin to config file
const io = new Server(wsServer, {
  cors: { origin: ALLOWED_DOMAINS as string[] },
});

io.on("connection", (socket) => {
  console.log("client connected", socket.id);

  socket.on("join", (data) => {
    socket.join(String(data.tenantId));

    // todo: remove from room on leave.
    socket.emit("join", { roomId: String(data.tenantId) });
  });
});

export default { wsServer, io };
