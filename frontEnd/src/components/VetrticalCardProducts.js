import { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helper/fetchCategorywiseProduct";
import displayINRCurrency from "../helper/displayCurrency";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addtoCart from "../helper/addToCart";
import Context from "../context";

const VerticalCardProduct = ({ category, heading }) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const loadingList = new Array(13).fill(null);

    const [scroll, setScroll] = useState(0);

    const scrollElement = useRef()

    const {fetchUserDetails , fetchCount} = useContext(Context);


    const handleAddToCart = async(e , id) =>{
        await addtoCart(e,id);
        console.log(fetchCount());
        fetchCount();
     }
    const fetcData = async () => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category);
        setLoading(false)

        setData(categoryProduct.data)
    }

    useEffect(() => {
        fetcData()
    }, []);

    const scrollright = () => {
        scrollElement.current.scrollLeft += 300
    }

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300
    }

    return (<>
        <div className="container mx-auto px-4 my-6 relative">
            <h2 className="text-2xl font-semibold py-4">{heading}</h2>
            <div className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollebar-none transition-all" ref={scrollElement}>
                <button className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft /></button>
                <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollright}><FaAngleRight /></button>
                {
                    loading ? (loadingList.map((product, index) => {

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
                    })):(data.map((product, index) => {

                        return (
                            <Link to={"/product/" + product?._id} className="w-full  min-w-[280px] md:min-w-[400px] max-w-[280px] md:max-w-[400px]  bg-white rounded shadow" >
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
                                        handleAddToCart(e, product?._id)
                                    }} >Add to cart</button>
                                </div>
                            </Link>
                        )
                    }))
                    
                }
            </div>



        </div>
    </>)
}

export default VerticalCardProduct;