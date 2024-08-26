import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import VerticalCard from '../components/verticalCard';

const SearchProduct = () => {
    const query = useLocation()
    const[data,setData]=useState([]);
    const[loading,setLoading]=useState(false);
    console.log("query",query.search);

    const fetchProduct = async()=>{
        setLoading(true)
        const response = await fetch("https://e-commerce-backend-c2it.onrender.com/api/search"+query.search);
        const data = await response.json();
        setLoading(false);
        setData(data.data)
        console.log("data response",data);
    }

    useEffect(()=>{
        fetchProduct()
    },[query])
  return (
    <div className='container mx-auto p-4 '>
        {/* {
            loading && (<p>Loading....</p>)
        } */}
        
        <p>Search Result : {data.length}</p>
        {
            data.length === 0 && loading &&(
                <p className='bg-white text-lg text-center'>No data Found....</p>
            )
        }

        {
            data.length !== 0 && !loading && (
               
        <VerticalCard loading={loading} data = {data}/>
              
            )
        }
    </div>
  )
}

export default SearchProduct