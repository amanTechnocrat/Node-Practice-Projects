module.exports=filter=(req,res,next)=>{

    if(!req.query.age){
        res.send("please provide age")
    }
    else if(req.query.age < 18){
        res.send("you can't access this site")
    }
    else{
        next()
    }
}