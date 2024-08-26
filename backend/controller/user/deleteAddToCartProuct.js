
const addToCartModel = require("../../models/cartProduct")

const deleteAddToCart = async(req,res)=>{
    try{
const currentUserId = req.currentUserId;
const addToCartId = req.body.id;

    const deleteProduct = await addToCartModel.findOneAndDelete({_id : addToCartId})

    res.status(400).json({
        message: "Successfully deleted",
        error: false,
        success: true,
        data:deleteProduct
    })

    }
    catch(err){
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = deleteAddToCart