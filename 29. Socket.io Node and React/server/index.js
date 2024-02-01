const http = require('http');
const express = require('express');
const app = express()
const {Server} = require('socket.io');
const cors = require('cors');

app.use(cors())
const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:"http://192.168.5.73:3000"
    }
})

io.on("connection",(socket)=>{
    console.log(socket.id)

    socket.on("joinroom",(data)=>{
        console.log(data)
        socket.join(data.room)
    })

    socket.on("send_message",(data)=>{
        console.log(data,"messag")
        socket.to(data.room).emit("receivemessage",data)
    })

    socket.on("send_noti",(data)=>{
        socket.broadcast.emit("receive",data)
    })
})

server.listen(8888,"192.168.5.73",()=>{
    console.log("Server is Running on 8888")
})