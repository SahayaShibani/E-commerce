const productModel = require("../../models/productModel");
const uploadProductPermission = require("../../helper/permission");

async function updateProductController(req,res){
    try{
        const sessionUserId = req.userId;

        if (!uploadProductPermission(sessionUserId)) {
            throw new Error("Premission denied")
        }

        const {_id,...rest} = req.body

        const updateProduct = await productModel.findByIdAndUpdate(_id,rest);

        res.json({
            message:"Product updated successfully" , 
            data:updateProduct,
            success:true,
            error:false
        })

    }
    catch(err){
        res.status(400).json({
            message : err.message || err ,
            error:true,
            success:false
        })
    }
}

module.exports = updateProductController