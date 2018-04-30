var socket = io();

socket.on('connect', function () {
    console.log("connected to server");

    socket.on('newmessage', function (message) {
        console.log("newmessage", message);
    })
});

socket.on('disconnect', function () {
    console.log("disconnected from server");
})

