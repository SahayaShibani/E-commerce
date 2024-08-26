import "./App.css";
import Header from './components/header';
import Login from './pages/login';
import {Route,Routes,BrowserRouter} from 'react-router-dom';
import Footer from './components/footer';
import Home from './pages/home';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from './pages/forgotPassword';
import SignUp from './pages/signUp';
import { useEffect, useState } from 'react';
import Context from "./context";
import { useDispatch } from "react-redux";
// import { setUserDetails } from "./store/userSlice";
import AdminPanel from "./pages/adminPanel";
import AllUsers from "./pages/allusers";
import AllProducts from "./pages/allProducts";
import CategoryProduct from "./pages/CategoryProduct";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import SearchProduct from "./pages/SearchProduct";
import MyOrders from "./pages/MyOrders";

function App() {

  let [response , setResponse] = useState({});
  let[cartCount,setCartCount] = useState(0)
 
  const fetchUserDetails = async()=>{

    const data = await fetch("https://e-commerce-backend-c2it.onrender.com/api/user-details" , {
      method:"get",
      credentials:"include"
    })

   let res = await data.json();
   setResponse(res.datas)
   
  }

  const fetchCount = async()=>{
    const countResponse = await fetch("https://e-commerce-backend-c2it.onrender.com/api/countAddtocart",{
      method:"get",
      credentials:"include"
    })

    const count = await countResponse.json();
    console.log("count",count);

 setCartCount(count?.data?.count)

  }

  useEffect(()=>{

    fetchUserDetails();
    fetchCount();

  },[cartCount])

  

  return (
   <>
   <Context.Provider value={{
    fetchUserDetails ,
    cartCount,
    fetchCount
   }}>
   <ToastContainer position="top-center"/>
   <BrowserRouter>
   <Header user={response} ></Header>
   <main className='min-h-[calc(100vh-120px)] pt-20'>
   <Routes>
    
   <Route path="/" element={<Home/>}/>
   <Route path="/register/login" element={<Login/>}/>
   <Route path="/forgot-password" element={<ForgotPassword/>}/>
   <Route path="/register/sign-up" element={<SignUp/>}/>
   <Route path="/admin-panel" element={<AdminPanel details={response}/>}>
    <Route path="all-users" element={<AllUsers/>}/>
    <Route path="all-products" element={<AllProducts/>}/>
   </Route>
   <Route path="/category-Product/:categoryName" element={<CategoryProduct/>}/>
   <Route path="/product/:id" element={<ProductDetail/>}/>
   <Route path="/cart" element={<Cart/>}/>
   <Route path="/myOrders" element={<MyOrders/>}/>
   <Route path="search" element={<SearchProduct/>}/>
   </Routes>
   </main>
   <Footer></Footer>
   </BrowserRouter>
   </Context.Provider>
   </>
  );
}

export default App;
