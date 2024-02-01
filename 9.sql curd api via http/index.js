const http = require('http');
const util = require('util');
const url = require('url');
const express = require('express');
const app = express()
let array = ["wfved","fedfw","qwerty"]


const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })

    // console.log(req.method);
    if (req.method === "GET" && req.url === "/") {
        res.write(JSON.stringify(array))
        res.end()
    } 
    else if (req.method === "POST" && req.url.includes("/add")) {
        let path = url.parse(req.url,true)
        let data = util.inspect(path.query.data)
        array.push(data)
        res.write(JSON.stringify(array))
        res.end()
    }
    else if (req.method === "PUT" && req.url.includes("/update")) {
        let path = url.parse(req.url,true)
        let data = util.inspect(path.query.data)
        let id =util.inspect(parseInt(path.query.id))  
        console.log(id,data);
        array.splice(id, 1, data);
        res.write(JSON.stringify(array))
        res.end()
    }
    else if (req.method === "DELETE" && req.url.includes("/delete")) {
        let path = url.parse(req.url,true)
        let id =util.inspect(parseInt(path.query.id))
    
        array.splice(id,1);
        res.write(JSON.stringify(array))
        res.end()
    }
})
server.listen(8888)