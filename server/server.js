const path = require('path');
var express = require('express');
var http = require('http');
var socketIO = require('socket.io');

const {isRealString}=require('./utils/validation');
const { generatemessage, generatelocationmessage } = require('./utils/message');
const publicpath = path.join(__dirname, '/../public');
const {Users}=require('./utils/user');
var users=new Users();

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicpath));

io.on('connect', (socket) => {
    console.log('new user connected');

    socket.on('join',(params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and Room name are requried');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);

        io.to(params.room).emit('updateUserList',users.getUserList(params.room));
        socket.emit('newmessage', generatemessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newmessage', generatemessage('Admin', `${params.name} has joined`));
        callback();
    });

    socket.on('createmessage', function (message, callback) {
        console.log('message:', message.from);
        io.emit('newmessage', generatemessage(message.from, message.text));
        callback();
    });

    socket.on('createlocationmessage', function (coords) {
        // console.log('//////',coords.latitude);
        io.emit('newlocationmessage', generatelocationmessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        // console.log('User Disconnected');
        var user= users.removeUser(socket.id);
        
        if(user){
        io.to(user.room).emit('updateUserList',users.getUserList(user.room));
        io.to(user.room).emit('newmessage',generatemessage('Admin',`${user.name} has left`));
        }
    });
});



server.listen(3000, () => {
    console.log("Server started at port 3000");
});