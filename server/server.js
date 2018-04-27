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

    socket.on('disconnect', (socket) => {
        console.log('User Disconnected');
    });

    socket.emit('fromServer',{
        from:"yash",
        text:"heyyy youuu"
    })

   socket.on('fromClient',function(message){
    console.log('message:',message);
   })

});



server.listen(3000, () => {
    console.log("Server started at port 3000");
});