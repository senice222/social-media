const io = require("socket.io")(5001, {
    cors: {
        origin: "http://localhost:5173" && "http://127.0.0.1:5173",
        // origin: "http://127.0.0.1:5173",
    }
})

let users = []

const addUser = (userId, socketId) => {
    const existingUser = users.find(user => user.userId === userId);

    if (!existingUser) {
        users.push({ userId, socketId });
    }
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

const getUser = (userId) => {
    return users.find(user => user.userId === userId)
}

io.on("connection", (socket) => {
    // when connect
    console.log("a user connected.")

    //me
    socket.emit("me", socket.id)

    // add user in array
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id)
        io.emit("getUsers", users)
    })

    // send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
        });
    });

    // disconnect from call
    socket.on("disconnectCall", () => {
        socket.broadcast.emit("callEnded")
    })

    // call
    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit("callUser", {signal: data.signalData, from: data.from, name: data.name})
    })

    // answer call
    socket.on("answerCall", (data) => {
        io.to(data.to).emit("answerCall", data.signal)
    })

    // disconnect
    socket.on("disconnect", () => {
        console.log("user disconnected!")
        removeUser(socket.id)
        io.emit("getUsers", users)
    })
})