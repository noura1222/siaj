// Soeckt.io
import io from "socket.io-client";
const socket = io("http://192.168.1.71:3001", { 'transports': ['websocket'] });
socket.emit("login", { id: "userID" });

export default socket;
