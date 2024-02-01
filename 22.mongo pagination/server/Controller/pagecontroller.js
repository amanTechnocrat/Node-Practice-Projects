const col = require('../Models/Schema');
const gentoken = require('../helper/jwt').gentoken;
exports.pagination= async (req, res) => {
    let pageSize = req.query.pageSize || 10
    let nextpage = req.query.next || 1
    let data = await col.find().limit(pageSize).skip(pageSize*(nextpage - 1));
    res.json(data);
};

exports.token = async(req,res)=>{
    try {
        if(req.body.name){
        let token = gentoken(req.body.name)
        res.json({token:`Bearer ${token}`,status_code:200})
        }else{
            new error
        }
    } catch (error) {
        res.json({msg:"erro",status_code:403})
    }
}