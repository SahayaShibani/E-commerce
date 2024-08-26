
const express = require('express');

const router = express.Router();

const userSignUpController = require("../controller/user/userSignup");
const userSignInController = require("../controller/user/userSignin");
const userDetailController = require('../controller/user/userDetails');
const auth = require('../middleware/auth');
const userLogout = require('../controller/user/userLogout');
const allUsers = require('../controller/user/allUsers');
const updateUser = require('../controller/user/updateUser');
const UploadProductController = require('../controller/product/uploadProduct');
const getProductController = require('../controller/product/getProduct');
const updateProductController = require('../controller/product/updateProduct');
const getCategoryProduct = require('../controller/product/getCategoryProductOne');
const getCategorywiseProduct = require('../controller/product/getCategoryWiseProduct');
const getProductDetails = require('../controller/product/getProductDetails');

const addToCartController = require("../controller/user/addToCartController");
const countAddToCartProduct = require('../controller/user/countAddToCartProduct');
const addToCartView = require('../controller/user/addToCartView');
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct');
const deleteAddToCart = require('../controller/user/deleteAddToCartProuct');
const searchProduct = require('../controller/product/SearchProduct');

const placeOrder = require("../controller/orders/orders");
const getOrders = require("../controller/orders/getOrders");
const cancelOrder = require("../controller/orders/cancelOrders")



router.post("/signup",userSignUpController);
router.post("/login",userSignInController);
router.get('/user-details',auth,userDetailController);

router.get('/userLogout',auth,userLogout);

// admin panel
router.get('/all-user',auth,allUsers);
router.post("/update-user" , auth , updateUser);


//'product'

router.post("/upload-product" ,auth, UploadProductController);
router.get("/get-product",getProductController);
router.post("/update-product",auth,updateProductController);
router.get("/getCategoryProduct",getCategoryProduct);
router.post("/category-product",getCategorywiseProduct);
router.post("/product-details",getProductDetails);

// add to cart
router.post("/addtocart",auth,addToCartController);
router.get("/countAddtocart",auth,countAddToCartProduct);
router.get("/view-cart-product",auth, addToCartView);
router.post("/update-cart-product",auth,updateAddToCartProduct)
router.post("/delete-cart-product",auth,deleteAddToCart);
router.get('/search',searchProduct)


// place order

router.post("/placeOrder" , auth , placeOrder);
router.get('/view-order-products',auth,getOrders)
router.post('/delete-order-product',auth,cancelOrder)


module.exports = router;