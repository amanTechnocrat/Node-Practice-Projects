const webSocket = require('ws');

const wss = new webSocket.Server({ port: 7888 })

wss.on("connection", (ws) => {
    console.log(`new client is connected ${ws}`)

    ws.on("message", (data) => {
        console.log(`client has sent ${data}`)
        ws.send("Received data")
    })

    ws.on("close", () => console.log("Client has disconnected"))
})
