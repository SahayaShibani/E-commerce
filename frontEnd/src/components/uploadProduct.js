import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import productCategory from '../helper/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helper/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const UploadProducts = ({ onClose , fetchData}) => {

    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    })
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
    const [fullScreenImage, setFullScreenImage] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0];



        const uploadImageCloudinary = await uploadImage(file);

        setData((prev) => {
            return {
                ...prev,
                productImage: [...prev.productImage, uploadImageCloudinary.url]
            }
        })

        // console.log("Upload Image", uploadImageCloudinary.url);

    }

    const handleDeleteProductImage = async (index) => {
        const newProductImage = [...data.productImage];
        newProductImage.splice(index, 1);

        setData((prev) => {
            return {
                ...prev,
                productImage: [...newProductImage]
            }
        })
    }

    // upload product

    const handleSubmit = async(e) =>{
        e.preventDefault();
       

        const uploadresponse = await fetch("https://e-commerce-backend-c2it.onrender.com/api/upload-product" , {
            method:"post" ,
            credentials : "include",
            headers:{
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })

      

        const responsedata = await uploadresponse.json();

        console.log(responsedata);

        if(responsedata.success){
            toast.success(responsedata.message);
            onClose();
            fetchData()
        }
        if(responsedata.error){
            toast.error(responsedata.message)
        }
    }

    return (
        <div className="fixed upload-product bg-slate-200 bg-opacity-35 w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center">
            <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
                <div className="flex justify-between items-center pb-3">
                    <h2 className="font-bold text-lg">Upload Products</h2>
                    <div className="w-fit ml-auto text-2xl close-btn" onClick={onClose}>
                        <IoMdClose />
                    </div>
                </div>

                <form className="grid p-4 gap-3 overflow-y-scroll h-full pb-20" onSubmit={handleSubmit }>
                    <label htmlFor="productName">Product Name :</label>
                    <input
                        type="text"
                        id="productName"
                        placeholder="Enter product name"
                        value={data.productName}
                        onChange={handleChange}
                        name="productName"
                        className="p-2 bg-slate-100 border rounded" 
                        required/>

                    <label htmlFor="brandName" className="mt-3">Brand Name :</label>
                    <input
                        type="text"
                        id="brandName"
                        placeholder="Enter brand name"
                        value={data.brandName}
                        onChange={handleChange}
                        name="brandName"
                        required
                        className="p-2 bg-slate-100 border rounded" />

                    <label htmlFor="category" className="mt-3">Category :</label>

                    <select className="p-2 bg-slate-100 border rounded" id="category" value={data.category} name="category" onChange={handleChange} required>
                        <option value={""}>Select Category</option>
                        {
                            productCategory.map((item, index) => {
                                return (
                                    <option value={item.value} key={item.value + index}>
                                        {item.label}
                                    </option>
                                )
                            })
                        }
                    </select>

                    <label htmlFor="productImage" className="mt-3">Product Image : </label>
                    <label htmlFor="uploadImageInput">
                        <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">

                            <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                                <span className="text-4xl">
                                    <FaCloudUploadAlt />
                                </span>

                                <p className="text-sm">Upload Product Image</p>
                                <input type="file" id="uploadImageInput" className="hidden" onChange={handleUploadProduct}/>
                            </div>



                        </div>
                    </label>
                    <div>
                        {
                            data?.productImage[0] ? (

                                <div className="flex items-center gap-5">
                                    {
                                        data.productImage.map((url, index) => {
                                            return (
                                                <div className="relative group">
                                                    <img
                                                        src={url}
                                                        alt="image"
                                                        width={80}
                                                        height={80}
                                                        className="bg-slate-100 border cursor-pointer"
                                                        onClick={() => {
                                                            setOpenFullScreenImage(true)
                                                            setFullScreenImage(url)
                                                            console.log(url);
                                                        }} />
                                                    <div className="absolute bottom-0 right-0 p-1 imageRemove text-white rounded-full hidden group-hover:block cursor-pointer" onClick={() => handleDeleteProductImage(index)}>
                                                        <MdDelete />
                                                    </div>
                                                </div>

                                            )
                                        })
                                    }
                                </div>

                            ) :
                                (
                                    <p className="upload-p text-xs">
                                        * Please upload product Image
                                    </p>
                                )
                        }
                    </div>
                    <label htmlFor="price" className="mt-3">Price :</label>

                    <input
                        type="number"
                        id="price"
                        placeholder="Enter price"
                        value={data.price}
                        onChange={handleChange}
                        name="price"
                        className="p-2 bg-slate-100 border rounded" required/>

                    <label htmlFor="sellingPrice" className="mt-3">Selling Price :</label>

                    <input
                        type="number"
                        id="sellingPrice"
                        placeholder="Enter selling price"
                        value={data.sellingPrice}
                        onChange={handleChange}
                        name="sellingPrice"
                        className="p-2 bg-slate-100 border rounded" required/>

                    <label htmlFor="description" className="mt-3">Description :</label>
                    <textarea id="description" name="description" className="h-28 bg-slate-100 border resize-none p-1" placeholder="Enter product description..." rows={3} onChange={handleChange} value={data.description} required>

                    </textarea>

                    <button className="px-3 py-1 upload-btn text-white mb-10" type="submit">Upload Product</button>
                </form>


            </div>

            {/* display image full screen */}
            {
                openFullScreenImage && (<DisplayImage onClose={() => setOpenFullScreenImage(false)} imgurl={fullScreenImage} />)
            }


        </div>
    )
}

export default UploadProducts