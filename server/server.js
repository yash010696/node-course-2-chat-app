const path=require('path');
var express=require('express');

const publicpath=path.join(__dirname,'/../public');

var app=express();

app.use(express.static(publicpath));

app.listen(3000,()=>{
    console.log("Server started at port 3000");
});