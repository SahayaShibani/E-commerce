import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import displayINRCurrency from "../helper/displayCurrency";
import VerticalCardProduct from "../components/VetrticalCardProducts";
import productCategory from "../helper/productCategory";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";

const ProductDetail = () => {

    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    })
    const params = useParams();

    const [loading, setLoading] = useState(true);
    const productImageListLoading = new Array(4).fill(null);
    const [activeImage, setActiveImage] = useState("")

    const { id } = params;

    const fetchProductDetail = async (id) => {
        setLoading(true)
        const response = await fetch(`https://e-commerce-backend-c2it.onrender.com/api/product-details`, {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                productId: id
            })

        });

        setLoading(false)

        const dataresponse = await response.json();

        setData(dataresponse?.data);
        setActiveImage(dataresponse?.data.productImage[0]);
        

    }


    useEffect(() => {
        fetchProductDetail(id)
    }, [id])

    const handleMouseEnterProduct = (imageUrl) => {
        setActiveImage(imageUrl);
    }

    // /product-details

    return (<>
        <div className="container mx-auto p-4">
            <div className="min-h-[200px] flex flex-col lg:flex-row gap-4" >
                {/* product Image */}
                <div className="h-96 flex flex-col lg:flex-row-reverse gap-4 ">
                    <div className="lg:h-96 md:w-96 h-[300px] min-w-[330px] bg-slate-200 relative p-2">
                        <img src={activeImage} className="h-full w-full object-scale-down mix-blend-multiply" />
                        {/* product zoom */}
                        
                    </div>
                    <div className="h-full">
                        {
                            loading ? (
                                <div className="flex gap-2 lg:flex-col overflow-scroll scrollebar-none h-full">
                                    {
                                        productImageListLoading.map((el => {
                                            return (
                                                <div className="h-20 w-20 bg-slate-200 rounded animate-pulse">

                                                </div>)
                                        }))
                                    }
                                </div>
                            ) : (<div>
                                <div className="flex gap-2 lg:flex-col overflow-scroll scrollebar-none h-full">
                                    {
                                        data?.productImage.map((image, index) => {
                                            return (
                                                <div className="h-20 w-20 bg-slate-200 rounded p-1" key={image}>
                                                    <img src={image} className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer" onMouseEnter={() => handleMouseEnterProduct(image)} onClick={() => handleMouseEnterProduct(image)} />
                                                </div>)
                                        })
                                    }
                                </div>

                            </div>)
                        }
                    </div>
                </div>
                {/* product Detail */}
                {
                    loading ? (
                    <div className="grid gap-1 w-full">
                        <p className="bg-slate-200  animate-pulse h-6 lg:h-8 w-full rounded-full inline-block"></p>
                        <h2 className="text-2xl lg:text-4xl font-semibold h-4 bg-slate-200 animate-pulse lg:h-8"></h2>
                        <p className="capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8"></p>

                        <div className="text-yellow-400 bg-slate-200 h-6 animate-pulse  flex items-center gap-1">
                            
                        </div>
                        <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-2 h-6 animate-pulse lg:h-8">
                            <p className=" text-color bg-slate-200"></p>
                            <p className="text-slate-400 line-through bg-slate-200"></p>
                        </div>

                        <div className="flex items-center gap-3 my-2">
                            <button className="  min-w-[120px] h-6 rounded animate-pulse bg-slate-200 lg:h-8"></button>
                            <button className="  min-w-[120px] rounded h-6 animate-pulse bg-slate-200 lg:h-8"></button>
                        </div>

                        <div>
                            <p className=" my-1 rounded animate-pulse bg-slate-200 h-10"></p>
                            <p></p>
                        </div>
                    </div>) 
                    : 
                    (<div className="flex flex-col">
                        <p className="bg-red-200 text-red-600 px-2 rounded-full inline- w-fit">{data.brandName}</p>
                        <h2 className="text-2xl lg:text-4xl font-semibold">{data.productName}</h2>
                        <p className="capitalize text-slate-400">{data.category}</p>

                        <div className="text-yellow-400 flex items-center gap-1">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStarHalfAlt />
                        </div>
                        <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-2">
                            <p className=" text-color">{displayINRCurrency(data.sellingPrice)}</p>
                            <p className="text-slate-400 line-through">{displayINRCurrency(data.price)}</p>
                        </div>

                        <div className="flex items-center gap-3 my-2">
                            <button className="border-2 border-color rounded px-3 py-1 min-w-[120px] text-color  hover:text-white hover-btn">Buy</button>
                            <button className="border-2 border-color rounded px-3 py-1 min-w-[120px] font-medium bg-color bg-hover text-white">Add To Cart</button>
                        </div>

                        <div>
                            <p className="text-slate-600 font-medium my-1">Description</p>
                            <p>{data.description}</p>
                        </div>
                    </div>)
                }
            </div>
            {
                data.category && (<CategoryWiseProductDisplay category={data?.category} heading={"Recommended Product"}/>)
            }
            
            {/* {
                productCategory
            } */}
        </div>
    </>)
}
export default ProductDetail;