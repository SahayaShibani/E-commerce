const addOrder =require("../../models/orderModel");
const addToCart = require("../../models/cartProduct")

const placeOrderController = async (req, res) => {

    try {
        // console.log(req.body.data);
        const sessionUser = req.userId;
       const {data} = req.body;
       const productId =[];
       const quantity=[];

        for(let i=0;i<data.length;i++){
           productId.push(data[i].productId);
           quantity.push(data[i].quantity)
        }
        
        const createOrder = await addOrder.create({...data,productId:productId , quantity:quantity , ['totalPrice']:req.body.totalPrice , userId:sessionUser});

       

       await addToCart.deleteMany({userId:sessionUser})
       
       return res.json({
        data:createOrder,
        message: "Order Placed Successfully",
        success: true,
        error: false
    })
    }
    catch (err) {
        res.json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

module.exports = placeOrderController;