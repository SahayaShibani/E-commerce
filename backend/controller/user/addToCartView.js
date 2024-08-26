const addToCart = require("../../models/cartProduct")

const addToCartView = async (req, res) => {
    try {
// console.log(addToCart);
        const userId = req.userId;

        const allProduct = await addToCart.find(
            {
                userId: userId
            }
        ).populate("productId");
        
        // console.log(allProduct);
        res.json({
            data: allProduct,
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

module.exports = addToCartView