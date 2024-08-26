import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import VerticalCard from "../components/verticalCard";
import displayINRCurrency from "../helper/displayCurrency";
import scrollTop from "../helper/scrollTop";
import Context from "../context";
import addtoCart from "../helper/addToCart";


const CategoryProduct=()=>{
  const loadingList = new Array(13).fill(null);
  const {fetchUserDetails , fetchCount} = useContext(Context);
  const[data,setData]=useState([]);
  const[loading,setLoading]=useState(false);
    const params = useParams();

    const fetchProduct = async() =>{
      setLoading(true)
      const response = await fetch("https://e-commerce-backend-c2it.onrender.com/api/category-Product/",{
        method:"post",
        credentials:'include',
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({category : params.categoryName})
      });
      const data = await response.json();
      setLoading(false);
      setData(data.data)
      console.log("data response",data);
    }
    const handleAddToCart = async(e , id) =>{
      await addtoCart(e,id);
      fetchCount()
   }
 

    useEffect(()=>{
     fetchProduct();
    },[])
    return(<>
   
   <div className="flex  justify-between md:gap-6 flex-wrap" >
          
          {
             loading? (loadingList.map((product, index) => {
      
                  return (
                      <div className="w-full  min-w-[280px] md:min-w-[400px] max-w-[280px] md:max-w-[400px]  bg-white rounded shadow" >
                          <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse">
                             
      
                          </div>
                          <div className="p-4 grid gap-3">
                              <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black animate-pulse p-1 bg-slate-200 py-2 rounded-full"></h2>
                              <p className="capitalize text-slate-500 animate-pulse p-1 bg-slate-200 py-2 rounded"></p>
                              <div className="flex gap-3">
                                  <p className="text-red-400 font-medium animate-pulse p-1 bg-slate-200 w-full py-2"></p>
                                  <p className="text-slate-500 line-through animate-pulse p-1 bg-slate-200 w-full py-2"></p>
                              </div>
                              <button className="text-sm  text-white px-3 py-2 rounded-full animate-pulse p-1 bg-slate-200"></button>
                          </div>
                      </div>
                  )
              })):(data?.map((product, index) => {
              
                  return (
                      <Link to={"/product/" + product?._id} className="w-full  min-w-[280px] md:min-w-[400px] max-w-[280px] md:max-w-[400px]  bg-white rounded shadow" onClick={()=>scrollTop} key={index}>
                          <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                              <img src={product.productImage[0]} className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply" />
                          </div>
                          <div className="p-4 grid gap-3">
                              <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">{product?.productName}</h2>
                              <p className="capitalize text-slate-500">{product.category}</p>
                              <div className="flex gap-3">
                                  <p className="text-red-400 font-medium">{displayINRCurrency(product?.sellingPrice)}</p>
                                  <p className="text-slate-500 line-through">{displayINRCurrency(product?.price)}</p>
                              </div>
                              <button className="text-sm bg-color  text-white px-3 py-0.5 rounded-full" onClick={(e) => {
                                handleAddToCart(e,product?._id)
                              }} >Add to cart</button>
                          </div>
                      </Link>
                  )
              }))
              
          }
      </div>
    
        </>)
}

export default CategoryProduct;