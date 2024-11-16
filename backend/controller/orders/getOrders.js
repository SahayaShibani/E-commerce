const addOrder =require("../../models/orderModel");

const orderView = async (req, res) => {
    try {

        const userId = req.userId;
        // console.log(userId);
        
        const allOrder = await addOrder.find(
            {
                userId
            }
        ).populate("productId");


        let orders = [];
        let quantity=[];
        

        for(let i=0;i<allOrder.length;i++){
        
            orders.push(...allOrder[i].productId)
            quantity.push(...allOrder[i].quantity)
        }

        console.log(orders);
        
        
        
        return res.json({
            data:[...orders],
            quantity:[...quantity],
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
