const http = require('http');
const ct = require('./config');


const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })

    // console.log(req.method);
    if (req.method === "GET" && req.url === "/") {
        ct.query("select * from brands", (err, result, field) => {
            if (result) {
                // console.log(result);
                // res.write(result)
                // console.log(field);
                res.end(JSON.stringify(result))
            }
        })
    } 
    else if (req.method === "POST" && req.url === "/add") {
        data ={"name":"r&R"};
        // req.on('data', (chunk) => {
        //     data += chunk{"name":"r&R"}
        //     console.log(data); 
        // })
    }
})
server.listen(8888)