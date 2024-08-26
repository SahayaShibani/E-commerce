const mongoose = require('mongoose');

const addToCartSchema = mongoose.Schema({
    productId :{
        ref:"product",
        type:String
    },
    quantity : Number,
    userId : String
} , {
    timestamps:true
})

const addToCartModel = mongoose.model("Cart", addToCartSchema);

module.exports = addToCartModel