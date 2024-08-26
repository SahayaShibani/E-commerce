
import React, { useEffect } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useContext } from "react";
import Context from "../context";
import { Link, Outlet, useNavigate } from "react-router-dom";


const AdminPanel = ({details}) => {

    const navigate = useNavigate();
    
    // console.log("details" , details);
    useEffect(()=>{
        
        if(details?.role !== "ADMIN"){
            navigate("/")
        }
    },[])

    return (<>
        <div className="min-h-[calc(100vh-120px)] md:flex hidden ">
            <aside className="bg-white min-h-full w-full max-w-60 customShadow">
                <div className="h-32 flex justify-center items-center flex-col">
                    <div className='text-6xl cursor-pointer'>
                        <FaRegCircleUser />
                    </div>
                    <p className="capitalize text-lg  font-semibold">
                   {
                    details ? details.name : "User"
                   }
                    </p>
                    <p>{details?.role}</p>
                   </div>

                   {/* navigation */}
                   <div>
                    <nav className="grid p-4">
                    <Link to={"all-users"} className="px-2 py-1 hover:bg-slate-100">All User</Link>
                    <Link to={"all-products"} className="px-2 py-1 hover:bg-slate-100">All Product</Link>
                    </nav>
                    
                   </div>
            </aside>
            <main className="w-full h-full p-2 pt-16">
                <Outlet/>
            </main>
        </div>
    </>)
}

export default AdminPanel