import React, { useState, useEffect } from "react";
import "./Chat.css";
import socket from "../utils/socket/socket";

const Chat = () => {
    const [message, setMessage] = useState("");
    const [text, setText] = useState([]);

    useEffect(() => {
        socket.on("conversationNotification", notificationHandler);
        socket.on("chat", chatHandler);
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();

        socket.emit("chat", message);

        const txt = (
            <div className="msj macro">
                <div className="text text-l">
                    <p>{message}</p>
                    <p>
                        <small>{Date.now()}</small>
                    </p>
                </div>
            </div>
        );

        setText([...text, txt]);
        setMessage("");
    };

    const notificationHandler = ({ userID, userSocketId }) => {
        console.log("userId, userSocketId ", userID, userSocketId);

        const txt = (
            <div className="msj-rta macro">
                <div className="text text-r">
                    <p>user {userID} is waiting</p>
                    <button onClick={() => acceptConversation(userSocketId)}>Accept</button>
                    <p>
                        <small>{Date.now()}</small>
                    </p>
                </div>
                <div
                    className="avatar"
                    style={{ padding: "0px 0px 0px 10px !important" }}
                ></div>
            </div>
        );

        setText([...text, txt]);
    }

    const acceptConversation = (userSocketId) => {
        console.log("accept with ", userSocketId);

        socket.emit('acceptConversation', { admin: socket.id, user: userSocketId })
    }

    const chatHandler = (msg) => {
        const txt = (
            <div className="msj-rta macro">
                <div className="text text-r">
                    <p>{msg}</p>
                    <p>
                        <small>{Date.now()}</small>
                    </p>
                </div>
                <div
                    className="avatar"
                    style={{ padding: "0px 0px 0px 10px !important" }}
                ></div>
            </div>
        );

        setText([...text, txt]);
    };

    // chat message recieved
    socket.on("chat", chatHandler);

    return (
        <div className="col-md-6 frame">
            <ul className="chat-list">
                {text.map((txt, index) => (
                    <li style={{ width: "100%" }} key={index}>
                        {txt}
                    </li>
                ))}
            </ul>
            <div>
                <div className="msj-rta macro" style={{ margin: "auto" }}>
                    <div
                        className="text text-r"
                        style={{ background: "whitesmoke !important" }}
                    >
                        <form onSubmit={submitHandler}>
                            <input
                                className="mytext"
                                placeholder="Type a message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
