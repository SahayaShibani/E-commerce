const jwt = require('jsonwebtoken');


const auth = async (req,res,next)=>{

    try{
       const token = req.cookies?.token;
       
            // console.log(token);
     if(!token){
        return res.status(400).json({
            message : "User not login",
            error:true,
            success:false
        })
     }

       jwt.verify(token , process.env.TOKEN_SECRET_KEY,function (err , decoded){
        
        if(err) console.log("error auth",err);

        req.userId = decoded.tokenData._id;
        next(); 
        })
       
    }

    catch(err){
        res.status(400).json({
            message :err.message || err,
            data:[],
            error:true,
            success:false
        })
    }
}

module.exports = auth;