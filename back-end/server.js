require("dotenv").config();

const cors = require('cors')
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const bodyParser = require('body-parser')

app.use(bodyParser.json())
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connection to db established"));

// Socket.io
//
const userLocation = [
    { lng: 24.480174, lat: 39.635394 },
    { lng: 24.480176, lat: 39.635057 },
    { lng: 24.480043, lat: 39.635126 },
    { lng: 24.480302, lat: 39.635314 }
];

// Holde all user's waiting to be connected to chat
let waitingUsers = [];

// Admin Socekts
let admins = [];

io.on("connect", (socket) => {
    socket.on("login", (data) => {
        if (data.id === "userID") {
            console.log("a User connected");

            socket.on("startConversation", ({ userID, userSocketId }) => {
                console.log("userID, userSocketId ", userID, userSocketId)
                waitingUsers.push(userSocketId);
                io.to(userSocketId).emit("chat", "You are in the waiting list.")

                admins.forEach((admin) =>
                    io
                        .to(admin)
                        .emit("conversationNotification", { userID, userSocketId })
                );
            });

            socket.on("disconnect", () => {
                console.log("user disconnected");
            });
        } else {
            console.log("an Admin connected");

            admins.push(socket.id);

            // When an admin accepts a chat with the a user
            socket.on("acceptConversation", (data) => {
                if (waitingUsers.find((u) => u === data.user)) {
                    waitingUsers = waitingUsers.filter((u) => u !== data.user);
                    socket.to(data.user).emit('chat', `admin ${data.admin} talking with you.`)
                    connectChat(
                        io.sockets.connected[data.admin],
                        io.sockets.connected[data.user]
                    );
                } else {
                    console.log("user already connected with another Admin");
                }
            });

            socket.on("disconnect", () => {
                console.log("admin disconnected");

                admins = admins.filter((id) => id !== socket.id);
            });
        }
    });
});

function connectChat(admin, user) {
    // register messaging between admin and user.
    admin.on("chat", (msg) => user.emit("chat", msg));
    user.on("chat", (msg) => admin.emit("chat", msg));
}

app.use(cors());
app.use(express.json());

/*  ROUTES  */
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const violationsRouter = require('./routes/violations');
app.use('/violations', violationsRouter);

http.listen(process.env.PORT, () =>
    console.log(`server has started at port ${process.env.PORT}`)
);
