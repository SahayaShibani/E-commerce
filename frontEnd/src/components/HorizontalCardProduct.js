import { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helper/fetchCategorywiseProduct";
import displayINRCurrency from "../helper/displayCurrency";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addtoCart from "../helper/addToCart";
import Context from "../context";

const HorizontalCardProduct = ({ category, heading }) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
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
            <div className="flex items-center gap-4 md:gap-6 overflow-scroll scrollebar-none transition-all" ref={scrollElement}>
                <button className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft /></button>
                <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollright}><FaAngleRight /></button>
                {loading ? (
                    loadingList.map((product, index) => {

                        return (
                            <div className="w-full min-w-[280px] md:min-w-[400px] max-w-[280px] md:max-w-[400px] h-36 bg-white rounded shadow flex" >
                                <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[175px] animate-pulse">


                                </div>
                                <div className="p-4 grid w-full gap-2">
                                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse rounded-full"></h2>
                                    <p className="capitalize text-slate-500 bg-slate-200 animate-pulse  rounded-full"></p>
                                    <div className="flex gap-3 w-full">
                                        <p className="text-red-400 font-medium p-1 bg-slate-200 w-full"></p>
                                        <p className="text-slate-500 line-through p-1 bg-slate-200 w-full"></p>
                                    </div>
                                    <button className="text-sm  text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse"></button>
                                </div>
                            </div>
                        )
                    })) : (data.map((product, index) => {

                        return (
                            <Link to={"/product/" + product?._id} className="w-full min-w-[280px] md:min-w-[400px] max-w-[280px] md:max-w-[400px] h-36 bg-white rounded shadow flex" >
                                <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] ">
                                    <img src={product.productImage[0]} className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply" />

                                </div>
                                <div className="p-4 grid">
                                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">{product?.productName}</h2>
                                    <p className="capitalize text-slate-500">{product.category}</p>
                                    <div className="flex gap-3">
                                        <p className="text-red-400 font-medium">{displayINRCurrency(product?.sellingPrice)}</p>
                                        <p className="text-slate-500 line-through">{displayINRCurrency(product?.price)}</p>
                                    </div>
                                    <button className="text-sm bg-color  text-white px-3 py-0.5 rounded-full" onClick={(e) => {
                                        handleAddToCart(e, product?._id)
                                    }}>Add to cart</button>
                                </div>
                            </Link>
                        )
                    }))

                }
            </div>



        </div>
    </>)
}

export default HorizontalCardProduct;