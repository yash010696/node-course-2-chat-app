const path = require('path');
var express = require('express');
var http = require('http');
var socketIO = require('socket.io');

const publicpath = path.join(__dirname, '/../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicpath));

io.on('connect', (socket) => {
    console.log('new user connected');

    socket.emit('newmessage',{
        from:'Admin',
        text:'Welcome to the chst app'
    });

    socket.broadcast.emit('newmessage',{
        from:'Admin',
        text:'New User Joined'
    });

    socket.on('createmessage', function (message) {
        console.log('message:', message);
        io.emit('newmessage',{
            from:message.from,
            text:message.text
        });

        // socket.broadcast.emit('newmessage',{
        //     from:message.from,
        //     text:message.text
        // })
    });

    socket.on('disconnect', (socket) => {
        console.log('User Disconnected');
    });
});



server.listen(3000, () => {
    console.log("Server started at port 3000");
});