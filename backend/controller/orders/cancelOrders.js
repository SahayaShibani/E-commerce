const addOrder =require("../../models/orderModel");

const orderView = async (req, res) => {
    try {


        const userId = req.userId;
        // console.log(userId);

        // console.log("New Data" , req.body.newData);

        productIds = req.body.newData.map((item)=>item._id )

        console.log("product id",productIds);
        
        
        const allOrder = await addOrder.updateOne({userId},
            { $set: { productId: productIds} },
            { new: true }
            )

        // console.log("cancelorders",req.body);
        
        
        return res.json({
           message:"Order cancelled successfully",
           data:allOrder,
            success: true,
            error: false
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

module.exports = orderView