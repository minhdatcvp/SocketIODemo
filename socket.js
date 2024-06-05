// create a socket server
const express = require("express");
const Socket = require("socket.io");
const PORT = 5000;
const app = express();
const server = require("http").createServer(app);
const io = Socket(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

// listen event from client
io.on("connection", socket => {
    console.log('connected')

    socket.on('join', room => {
        socket.join(room);

        socket.on("disconnect", () => {
            socket.leave(room)
            console.log(`disconnected`);
        });
    })

    socket.on("message", message => {
        console.log(message)
    });
});


server.listen(PORT, () => {
    console.log("listening on PORT: ", PORT);
});

// create a api, BE call to it => emit event to client handle
setTimeout(() => {
    var test = Math.random();
    io.emit('customEvent', test);
}, 2000);
