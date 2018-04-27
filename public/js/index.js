var socket = io();

socket.on('connect', function()  {
    console.log("connected to server");

    socket.emit('fromClient',{
        from:"shah",
        text:"hello!!!!"
    })
    socket.on('fromServer',function(message){
        console.log("message",message);
    })
});

socket.on('disconnect', function()  {
    console.log("disconnected from server");
})

