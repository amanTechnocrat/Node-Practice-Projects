const multer = require('multer');

const fileinfo = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} -- ${file.originalname}`);
    }
})

const upload = multer({
    storage: fileinfo
})

module.exports = upload;