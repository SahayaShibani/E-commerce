const mongoose = require('mongoose');

const placeOrderSchema = mongoose.Schema({
    productId :{
        ref:"product",
        type:[String]
    },
    quantity : [Number],
    userId : String,
    totalPrice:Number
} , {
    timestamps:true
})

const orderModel = mongoose.model("order", placeOrderSchema);

module.exports = orderModel;