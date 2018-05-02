const path = require('path');
var express = require('express');
var http = require('http');
var socketIO = require('socket.io');

const { generatemessage, generatelocationmessage } = require('./utils/message');
const publicpath = path.join(__dirname, '/../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicpath));

io.on('connect', (socket) => {
    console.log('new user connected');

    socket.emit('newmessage', generatemessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newmessage', generatemessage('Admin', 'New User Joined'));

    socket.on('createmessage', function (message, callback) {
        console.log('message:', message.from);
        io.emit('newmessage', generatemessage(message.from, message.text));
        callback();
    });

    socket.on('createlocationmessage', function (coords) {
        // console.log('//////',coords.latitude);
        io.emit('newlocationmessage', generatelocationmessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', (socket) => {
        console.log('User Disconnected');
    });
});



server.listen(3000, () => {
    console.log("Server started at port 3000");
});