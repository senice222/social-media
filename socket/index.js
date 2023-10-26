const io = require("socket.io")(5001, {
    cors: {
        origin: "http://localhost:5173"
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

io.on("connection", (socket) => {
    console.log("a user connected.")

    socket.on("addUser", (userId) => {
        addUser(userId, socket.id)
        io.emit("getUsers", users)
    })

    socket.on("disconnect", () => {
        console.log("user disconnected!")
        removeUser(socket.id)
        io.emit("getUsers", users)
    })
})