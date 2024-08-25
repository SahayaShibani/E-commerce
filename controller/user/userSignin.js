
const bcrypt = require('bcrypt');
const User = require('../../models/userModel');
var jwt = require('jsonwebtoken')

async function userSignInController(req,res){

    try{
        const {email, password} = req.body;

        if(!email){
            throw new Error("Please provide email")
          }
          
          if(!password){
            throw new Error("Please provide password")
          }

          const findUser = await User.findOne({email})

          if(!findUser){
              throw new Error("User not found !")
          }

          const checkedPassword = await bcrypt.compare(password,findUser.password);
          // console.log("Checked Password" , checkedPassword); 

          if(checkedPassword){
            
            const tokenData = {
              _id:findUser._id , 
              email:findUser.email,
            }

           const token = await jwt.sign({
              tokenData
            }, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8});

            

            res.cookie("token",token , {httpOnly : true , secure :true}).json({
              message:"Login successfull",
              data:token ,
              success:true,
              error : false
            })
          }
          else{
            throw new Error("Please check the password")
          }
    }

    catch(err){
    
        res.json({
            message : err.message || err ,
            error : true ,
            success : false
        })
}
}

module.exports = userSignInController