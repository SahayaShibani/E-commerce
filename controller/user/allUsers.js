const userModel = require("../../models/userModel");


async function allUsers(req, res) {

    try {
       
        // console.log("detail-----" , req.userId);

        const alluser = await userModel.find()

        res.json({
            message:"All user",
            data: alluser,
            success:true,
            error:false
        })

    }
    catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
} 

module.exports=allUsers;