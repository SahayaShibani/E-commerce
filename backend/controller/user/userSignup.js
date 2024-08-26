 
 const User = require('../../models/userModel');
 const bcrypt = require('bcrypt');
 const saltRounds = 10;

async function userSignUpController(req , res){
   
        const {email , name , password} = req.body;

   try{
     
      if(!email){
        throw new Error("Please provide email")
      }
      if(!name){
        throw new Error("Please provide name")
      }
      if(!password){
        throw new Error("Please provide password")
      }

      const findUser = await User.findOne({email})
      // console.log(findUser);

     if(findUser){
       throw new Error("Already user exists")
     }

      const hash = await bcrypt.hash(password, saltRounds)
       
      const user =  new User({email , name , password : hash , role:"GENERAL"});

      const result = await user.save(); 

      res.status(201).json({
        data : result ,
        success : true,
        error : false ,
        message : "User created successfully"
       })            

   }
   catch(err){
    
      res.json({
          message : err.message || err ,
          error : true ,
          success : false
      })
   }
}
module.exports =  userSignUpController;