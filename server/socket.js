const ChatModal = require('./models/ChatModal');

function Socket(io) {
    io.on("connection", (socket) => {
        console.log("new user " + socket.id);
        socket.on('join_room', (data) => {
            socket.join(data);
            // console.log(`User With Id: ${socket.id} joined room: ${data}`);
        })

        socket.on("send", (data) => {
            // console.log(data, socket.id);
            ChatModal.create(data);
            socket.to(data.room).emit('receive', data);
        })

        socket.on("disconnect", () => {
            console.log(`user leaved ${socket.id}`);
        })
    });
}

module.exports = Socket;