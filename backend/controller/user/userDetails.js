const userModel = require("../../models/userModel");

const userDetailController = async (req , res)=>{
    try{
        
        const user = await userModel.findById(req.userId);


        res.status(200).json({
            datas:user,
            error:false,
            success:true,
            message:"User detail"
                })
     }
 
     catch(err){
         res.status(400).json({
             message :err.message || err,            
             error:true,
             success:false
         })
     }
}
module.exports=userDetailController