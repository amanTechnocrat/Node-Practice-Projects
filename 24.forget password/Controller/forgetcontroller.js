const schema = require('../Models/Schema');
const mail = require('../helper/mail');
const {gentoken} = require('../Middleware/jwt');
const {genhash} = require('../helper/bcrypt');

exports.get = async (req, res) => {
    let data = await schema.find()
    res.json(data)
}

exports.forgetpass = async (req, res) => {
    if (req.body.email) {
        let check = await schema.find({ "email": req.body.email })
        if (check.length !== 0) {
            let token = gentoken(req.body.email,"5m")
            mail(req.body.email,token)
            res.json("Mails is sends to account follow the link")
        } else {
            return res.json("Email is not found")
        }
    } else {
        return res.json("error")
    }
}

exports.createfp=async(req,res)=>{
    
    if(req.body.password ){
        let hashcode = await genhash(10,req.body.password)
        let data =  await schema.updateMany({email:res.valid.data},{password:hashcode});
        res.json(data)
    }else{
        res.json("error")
    }
}