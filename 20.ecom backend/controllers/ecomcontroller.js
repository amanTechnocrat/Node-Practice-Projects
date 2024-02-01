const ct = require('../config/sql');
const upload = require('../helper/image');
const fs = require('fs');


exports.delete_product = (req, res) => {
    try {
        ct.query(`delete from productdata where id = ${req.params.id}`, (err, result) => {
            if (err){ throw err}
            else {
                res.send(result)
            }
        })
        
    } catch (err) {
        console.log("here");
        res.status(400).json({error:err})
    }
}


exports.update_product = (req, resp) => {

    data = [
        req.body.title,
        req.body.category,
        req.body.price,
        req.body.productdes,
        req.params.id
    ]

    ct.query('update productdata set title = ?,category = ?,price = ?,productdes = ? where id = ?', data, (err, result, field) => {
        if (err) throw err;
        else {
            resp.send(result)
        }
    })
}

exports.add_product = (req, res) => {
    upload.single("image")(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {

            data = [
                req.body.title,
                req.body.category,
                `http://192.168.4.24:9999/image/${req.file.filename}`,
                req.body.price,
                req.body.productdes
            ]
            ct.query('insert into productdata SET title = ?,category = ?,imageurl = ?,price = ?,productdes = ?', data, (err, result, field) => {
                if (err) throw err;
                else {
                    res.json({ msg: "product added successfully" })
                }
            })
        }
    })
}

exports.get_product = (req, res) => {
    if (req.query.cat) {
        ct.query("select * from productdata where category = ?", req.query.cat, (err, result, field) => {
            if (result) {
                res.send(result)
            }
        })
    } else {
        ct.query("select * from productdata", (err, result, field) => {
            if (result) {
                res.send(result)
            }
        })
    }
}

exports.get_productbyid = (req, res) => {
    ct.query("select * from productdata where ID = ?", req.params.id, (err, result, field) => {
        if (result) {
            res.send(result)
        }
    })
}



exports.viewimage = (req, res) => {
    try {
        const path = `./images/${req.params.url}`
        const file = fs.createReadStream(path)
        res.setHeader('Content-Disposition', 'attachment: filename="' + req.params.url)
        file.pipe(res)
    } catch (error) {
        console.log(error.message);
    }

}

exports.videost = (req,res)=>{
        const range = req.headers.range;
        if (!range){
             return res.send("invalid req")
        }
        console.log("range",range);
        const videoPath = `./images/${req.params.url}`
        const videoSize = fs.statSync(videoPath).size;
        console.log("vs",videoSize);
        // Parse Range
        // Example: "bytes=32324-"
        const chunk = 1024*1024; // 1MB
        
        const start = Number(range.replace(/\D/g, ""));
        // const start = Number(0);
        console.log("start",start);
        const end = Math.min(start + chunk, videoSize - 1);
        console.log("end",end);
      
        // // Create headers
        const contentLength = end - start + 1;
        const headers = {
          "Content-Range": `bytes ${start}-${end}/${videoSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": contentLength,
          "Content-Type": "video/mp4",
        };
      
        // // HTTP Status 206 for Partial Content
        res.writeHead(206, headers);
      
        // create video read stream for this particular chunk
        const videoStream = fs.createReadStream(videoPath,{start,end});
        videoStream.on("data",(chunk)=>{
            res.write(chunk)
        })
        videoStream.on("end",()=>{
            res.end()
        })
        // Stream the video chunk to the client
        // videoStream.pipe(res)
    //   });
}


exports.add_product55 = (req, res) => {
    data = [
        req.body.title,
        req.body.category,
        req.body.imageurl,
        req.body.price,
        req.body.productdes
    ]
    ct.query('insert into productdata SET title = ?,category = ?,imageurl = ?,price = ?,productdes = ?', data, (err, result, field) => {
        if (err) throw err;
        else {
            res.json({ msg: "product added successfully" })
        }
    })
}

exports.all = (req,res)=>{
    res.status(401).json({error:`Routes not found on path ${req.path}`})
}