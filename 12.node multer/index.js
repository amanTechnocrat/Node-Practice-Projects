const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ct = require('./config');

const app = express();
app.use(express.json())

const fileinfo = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} -- ${file.originalname}`);
    }
})

const uploaderror = multer({
    storage: fileinfo,
    limits: { fileSize: 1024 * 1024 * 10 },
    fileFilter: picfilter = (req, file, cb) => {
        filter(file, cb);
    }
}).single('image');

const upload = multer({
    storage: fileinfo, fileFilter: picfilter = (req, file, cb) => {
        filter(file, cb);
    }
})

const filter = (file, cb) => {
    const allowedtypes = /jpg|jpeg|png/;
    console.log(file);


    const extname = allowedtypes.test(path.extname(file.originalname))
    if (extname) {
        return cb(null, true)
    } else {
        cb("incorrect type")
        console.log("error");
    }
}

app.use(cors())

app.post('/single', (req, res) => {
    uploaderror(req, res, (err) => {

        if (err) {
            res.send("error")
        } else {
            res.send(req.file)
            // console.log(req.file);
        }
    })
})

app.get('/image/:url', (req, res, next) => {
    const path = `./images/${req.params.url}`
    const file = fs.createReadStream(path)
    //   console.log(file);
    //   const filename = (new Date()).toISOString() + ".jpg";
    res.setHeader('Content-Disposition', 'attachment: filename="' + req.params.url)
    file.pipe(res)
    //   res.download(path)
}
)

app.post('/multiple', upload.array('images', 3), (req, res) => {
    console.log(req.files);
    res.send("success")
})

const filedupload = upload.fields([{ name: "image", maxCount: 1 }, { name: "images", maxCount: 3 }])

app.post('/field', filedupload, (req, res) => {
    console.log(req.files);
    res.send("success")
})

const dest = multer({ dest: "./images" }).single('image')

app.post('/dest', (req, res, next) => {
    dest(req, res, (err) => {
        if (err) {
            res.send(err)
        } else {
            res.send("success")
            console.log(req.file);
        }
    })
})


app.post('/addhtml', (req, resp) => {

    data = req.body.htmldata

    ct.query('insert into ckeditordb SET htmldata = ?', data, (err, result, field) => {
        if (result) {
            resp.send(result)
        } else {
            console.log(err);
        }
    })
})


app.get('/gethtmlbyid/:id', (req, res) => {
    ct.query("select htmldata from ckeditordb where ID = ?",req.params.id, (err, result, field) => {
        if (result) {
            res.send(result)
        }
    })
})


app.use('/view', express.static('image'));


app.listen(8888);