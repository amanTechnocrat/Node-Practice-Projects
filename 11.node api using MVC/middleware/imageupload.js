const multer = require('multer');

const fileupload = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./images")
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}--${file.originalname.toLowerCase()}`)
    }
})

const upload = multer({storage:fileupload}).single('image');

// exports.filedupload = upload.fields([{name:"image",maxCount:1}])
module.exports = upload;