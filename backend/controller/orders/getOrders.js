const addOrder =require("../../models/orderModel");

const orderView = async (req, res) => {
    try {

        const userId = req.userId;
        // console.log(userId);
        
        const allOrder = await addOrder.findOne(
            {
                userId
            }
        ).populate("productId");
        // console.log("all orders" , allOrder);
        
        return res.json({
            data: allOrder.productId,
            quantity:allOrder.quantity,
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