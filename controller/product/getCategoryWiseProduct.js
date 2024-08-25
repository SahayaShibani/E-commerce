const productModel = require("../../models/productModel");

const getCategorywiseProduct = async (req, res) => {

    try {
        const { category } = req?.body || req?.query || req?.params;
        const product = await productModel.find({ category });

        res.json({
            data:product,
            message:"Product",
            success:true,
            error:false
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
module.exports = getCategorywiseProduct;