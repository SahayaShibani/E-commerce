const addToCartModel = require("../../models/cartProduct")


const updateAddToCartProduct=async(req,res)=>{

    try{
     const currentUser = req.userId;
     const addToCartId = req.body.id;
     console.log(addToCartId);
     const qty = req.body.quantity;

     const updateProduct = await addToCartModel.updateOne({_id:addToCartId} , {
      ...(qty &&{ quantity : qty})
     });

    

     res.json({
        message :"Product Updated",
        error : false,
        success:true
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

module.exports = updateAddToCartProduct;