const addtoCart =require("../../models/cartProduct");


const addToCartController = async (req, res) => {

    try {
        const { productId } = req.body;
        const currentUser = req.userId;

        const isProductavailable = await addtoCart.findOne({ productId });
        // console.log(isProductavailable);

        if (isProductavailable) {
            return res.json({
                message: "Already exist in add to cart",
                success: false,
                error: true
            })
        }

        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser
        }

        const newAddToCart = new addtoCart(payload);

        const saveProduct = await newAddToCart.save();

       return res.json({
            data:saveProduct,
            message:"Product added to cart",
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

module.exports = addToCartController;