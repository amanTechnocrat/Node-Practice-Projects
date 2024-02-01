const WebSocket = require('websocket').server;
const http = require('http');

const server = http.createServer();
server.listen(8888,"192.168.5.73",()=>console.log("server listining on 8888"))

const client ={}

const wsServer = new WebSocket({
    httpServer:server
})

wsServer.on("request",(request)=>{
    let uniq = 'id' + (new Date()).getTime();
    
    const connection = request.accept(null,request.origin)
    client[uniq]=connection

    connection.on('message', function(message) {
        if (message.type === 'utf8') {
     
          for(key in client) {
            client[key].sendUTF(message.utf8Data);
            console.log("🚀 ~ file: index.js ~ line 24 ~ connection.on ~ message.utf8Data", message.utf8Data)
          }
        }
      })


})

