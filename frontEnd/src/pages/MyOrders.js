import { useContext, useEffect, useState } from "react";
import Context from "../context";
import displayINRCurrency from '../helper/displayCurrency';
import { MdDelete } from "react-icons/md";
import {toast} from 'react-toastify';
import React from 'react'

function MyOrders() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const context = useContext(Context);
    const loadingCard = new Array(context.cartCount).fill(null);
    const [quantity , setQuantity] = useState([])

    const fetchData = async () => {

        setLoading(true);
        const response = await fetch("https://e-commerce-backend-c2it.onrender.com/api/view-order-products", {
            method: "get",
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
        })

        const responseData = await response.json();
console.log('====================================');
console.log(responseData);
console.log('====================================');
        if (responseData.success) {
            setData(responseData.data)
            setQuantity(responseData.quantity)
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const increaseQty = async (id, qty) => {
        console.log(id);
       
        const response = await fetch("https://e-commerce-backend-c2it.onrender.com/api/update-cart-product", {
            method: "post",
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                id,
                quantity: qty + 1
            })
        })

        const responsedata = await response.json();

        if (responsedata.success) {
            fetchData();
        }
    }

    const decreaseQty = async (id, qty) => {
       
       if(qty >=2){
        const response = await fetch("https://e-commerce-backend-c2it.onrender.com/api/update-cart-product", {
            method: "post",
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                id,
                quantity: qty - 1
            })
        })

        const responsedata = await response.json();

        if (responsedata.success) {
            fetchData();
        }
       }
       
    }

    const deleteItem = async (id) => {
       
        const newData = data.filter((item)=>item?._id != id);

        console.log("New Data" , newData);
    
       
         const response = await fetch("https://e-commerce-backend-c2it.onrender.com/api/delete-order-product", {
             method: "post",
             credentials: "include",
             headers: {
                 "content-type": "application/json"
             },
             body: JSON.stringify({
                 newData
         })
         })
 
         const responsedata = await response.json();
 console.log("Delete Orders" , responsedata.data);
 
         if (responsedata.success) {
            // setData(responsedata.data)
             fetchData();
         }
        
        
     }
 
    const totalQty= data.reduce((prev,curr)=>{
        return prev+curr.quantity
        },0)

    const totalPrice = data.reduce((prev,current)=>
         prev+(current?.quantity* current?.productId?.sellingPrice),0
    )


  return (
    <>
       <>
      <div className="container mx-auto flex flex-col justify-center items-center min-h-screen">
        <div className="text-center text-lg my-3">
          {data.length === 0 && !loading && (
            <p className="bg-white py-5">No Data</p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:justify-center items-center p-4 w-full">
          {/* View Products */}
          <div className="w-full max-w-3xl flex flex-col items-center">
            {loading ? (
              loadingCard.map((el, key) => (
                <div
                  key={key}
                  className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                ></div>
              ))
            ) : (
              data.map((product, index) => (
                <div
                  key={product?._id + "cart"}
                  className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]"
                >
                  <div className="w-32 h-32 bg-slate-200">
                    <img
                      src={product?.productImage[0]}
                      className="w-full h-full object-scale-down mix-blend-multiply"
                    />
                  </div>
                  <div className="px-4 py-2 ml-5 relative">
                    {/* Delete */}
                    <div
                      className="absolute right-0 text-red-400 rounded-full p-2 hover:bg-red-400 hover:text-white cursor-pointer"
                      onClick={() => deleteItem(product?._id)}
                    >
                      <MdDelete />
                    </div>
                    <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                      {product?.productName}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product?.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-red-400 font-medium text-lg">
                        {displayINRCurrency(product?.sellingPrice)}
                      </p>
                      <p className="text-slate-600 font-semibold text-lg">
                        {displayINRCurrency(
                          product?.sellingPrice * quantity[index]
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        
      </div>
    </>
    </>
  )
}

export default MyOrders
