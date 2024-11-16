import { useContext, useEffect, useState } from "react";
import Context from "../context";
import displayINRCurrency from '../helper/displayCurrency';
import { MdDelete } from "react-icons/md";
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const context = useContext(Context);
    const loadingCard = new Array(context.cartCount).fill(null)
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        const response = await fetch("https://e-commerce-backend-c2it.onrender.com/api/view-cart-product", {
            method: "get",
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
        })

        const responseData = await response.json();

        if (responseData.success) {
            setData(responseData.data)

            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const increaseQty = async (id, qty) => {
        console.log(id);
        console.log("Hi");
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
      
       
         const response = await fetch("https://e-commerce-backend-c2it.onrender.com/api/delete-cart-product", {
             method: "post",
             credentials: "include",
             headers: {
                 "content-type": "application/json"
             },
             body: JSON.stringify({
                 id, 
             })
         })
 
         const responsedata = await response.json();
 
         if (responsedata.success) {
             fetchData();
             context.fetchCount()
         }
        
        
     }
 
    const totalQty= data.reduce((prev,curr)=>{
        return prev+curr.quantity
        },0)
    const totalPrice = data.reduce((prev,current)=>
         prev+(current?.quantity* current?.productId?.sellingPrice),0
    )

  async  function handleSubmit(){
    console.log("I am from place order");
    
    const response = await fetch("http://localhost:8080/api/placeOrder",{
        method:"post",
        credentials: "include",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({data , totalPrice ,})
    })    
    
    const result = await response.json();

    if (result.success) {
        fetchData();
        console.log(result);
        
        toast.success(result.message);
        navigate("/myOrders")
    }
    console.log("result" , result);
    }
   
    

    return (<>
        <div className="container mx-auto">
            <div className="text-center text-lg my-3 ">
                {
                    data.length === 0 && !loading && (
                        <p className="bg-white py-5">No Data</p>
                    )
                }
            </div>
            <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
                {/* view productc */}
                <div className="w-full max-w-3xl">
                    {
                        loading ? (
                            loadingCard.map((el, key) => {
                                return <div key={key} className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded">

                                </div>
                            })

                        )
                            :
                            (
                                data.map((product, index) => {
                                    // console.log("...", product);
                                    return (<div key={product?._id + "cart"} className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]">
                                        <div className="w-32 h-32 bg-slate-200">
                                            <img src={
                                                product?.productId.productImage[0]
                                            } className="w-full h-full object-scale-down mix-blend-multiply" />
                                        </div>
                                        <div className="px-4 py-2 ml-5 relative">
                                            {/* delete */}
                                            <div className="absolute right-0 text-red-400 rounded-full p-2 hover:bg-red-400 hover:text-white cursor-pointer" onClick={()=>deleteItem(product?._id)}>
                                            <MdDelete />
                                            </div>
                                            <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">{product?.productId?.productName}</h2>
                                            <p className="capitalize text-slate-500">{product?.productId?.category}</p>
                                            <div className="flex items-center justify-between">
                                            <p className="text-red-400 font-medium text-lg">{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                            <p className="text-slate-600 font-semibold text-lg">{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                                </div>

                                            

                                            <div className="flex items-center gap-2 mt-2">
                                                <button className="flex justify-center items-center border border-color text-color w-6 h-6 rounded hover:text-white hover:bg-red-300" onClick={()=>{decreaseQty(product?._id, product?.quantity)}}>-</button>
                                                <span>{product?.quantity}</span>
                                                <button className="flex justify-center items-center border border-color text-color w-6 h-6 rounded hover:text-white hover:bg-red-300" onClick={() => { increaseQty(product?._id, product?.quantity) }}>+</button>
                                            </div>
                                        </div>
                                    </div>)
                                })
                            )
                    }
                </div>

                {/* Summary*/}
                <div className="mt-5 lg:mt-0 w-full max-w-sm">
                    {
                        loading ? (<div className="h-36 bg-slate-200 animate-pulse border border-slate-300">
                            Total
                        </div>) : (<div className="h-36 bg-white">
                            <h2 className="text-white bg-red-400 px-4 py-1">Summary</h2>
                            <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                                <p>Quantity </p>
                                <p>{totalQty}</p>
                            </div>
                            <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                                <p>Total Price</p>
                                <p>
{displayINRCurrency(totalPrice)}
                                </p>
                            </div>
                            <button className="bg-red-400 text-white w-full p-2" onClick={handleSubmit}>Place Order</button>
                        </div>)
                    }
                </div>

            </div>
        </div>
    </>)
}

export default Cart
