// Soeckt.io
import io from "socket.io-client";
const socket = io("http://localhost:3001");
socket.emit("login", { id: "adminID" });

export default socket;
