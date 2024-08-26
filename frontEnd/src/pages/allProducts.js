import react, { useEffect, useState } from 'react';
import UploadProducts from '../components/uploadProduct';
import AdminProductCard from '../components/AdminProductCard';


const AllProducts = () => {

    const [openUploadProduct, setOpenUploadProduct] = useState(false);

    const [allProduct, setAllProduct] = useState([]);

    const fetchProducts = async () => {
        const products = await fetch("https://e-commerce-backend-c2it.onrender.com/api/get-product")

        const productsResponse = await products.json();

        setAllProduct(productsResponse?.data || [])
    }

    useEffect(() => {
        fetchProducts()
    }, [allProduct])



    return (<>
        <div>
            <div className='bg-white py-2 px-4 flex justify-between item-center'>
                <h1 className='font-bold text-lg'>All Products</h1>
                <button className='border-2 py-1 px-3 rounded-full upload-product-btn transition-all' onClick={() => setOpenUploadProduct(true)}>Upload product</button>
            </div>

            {/* All Product */}

            <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
                {
                    allProduct.map((product, index) => {
                        return (
                            <AdminProductCard data={product} key={index+"allProduct"} fetchData={fetchProducts}/>
                           
                        )
                    })
                }
            </div>

            {/* upload product component */}
            {
                openUploadProduct && (<UploadProducts onClose={() => setOpenUploadProduct(false)} fetchData={fetchProducts}/>)
            }

        </div>

    </>)
}

export default AllProducts