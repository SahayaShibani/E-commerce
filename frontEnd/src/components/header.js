import './header.css';
import logo from '../images/logo.png';
import { FaRegCircleUser } from "react-icons/fa6";
import { FaOpencart } from "react-icons/fa6";
import { ImSearch } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import Context from '../context';
import { BsBorderStyle } from "react-icons/bs";


export default function Header({ user }) {

    const [menuDisplay, setMenusidplay] = useState(false);
    const context = useContext(Context);

const navigate = useNavigate();

    const handleLogout = async () => {

        const fetchData = await fetch('https://e-commerce-backend-c2it.onrender.com/api/userLogout', {
            method: "get",
            credentials: "include"
        })

        const data = await fetchData.json();
        
        console.log("test", data);

        if (data.success) {
            toast.success(data.message);

        }
        if (data.error) {
            toast.error(data.message)
        }

    }
    console.log(context);

    const handleSearch = (e) =>{
     const {value} = e.target;
     if(value){
    navigate(`/search?q=${value}`)
     }
     else {
        navigate("/search")
     }
    }
    return (
        <header className='h-20 shadow-md bg-white fixed w-full z-40'>
            <div className='h-full mx-auto flex items-center header'>
                <div className='logo'>
                    <Link to={"/"}>
                        <img src={logo} alt='ss-logo' />
                    </Link>
                </div>

                <div className='hidden lg:focus-within:shadow-md search'>
                    <input type='text' placeholder='Search products here....' onChange={handleSearch}/>
                    <div className='search-icons'>
                        <ImSearch className='search-icon' height="100%" />
                    </div>
                </div>

                <div className='flex items-center gap-7'>


                    <div className='relative flex justify-center' onClick={() => setMenusidplay(!menuDisplay)}>
                        {
                            user?._id && (<div className='text-3xl cursor-pointer'>
                                <FaRegCircleUser />
                            </div>)
                        }

                        {
                            menuDisplay && (
                                <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                                    <nav>
                                        {
                                            user?.role === "ADMIN" && (<Link to={"admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-50 p-2' onClick={() => setMenusidplay(!menuDisplay)}>Admin Panel</Link>)
                                        }

                                    </nav>
                                </div>
                            )
                        }

                    </div>

                    {
                        user?._id && (<Link to={"/cart"} className='text-3xl relative'>
                            <span><FaOpencart /></span>

                            <div className='cart-num text-white w-5 p-1 flex items-center justify-center h-5 rounded-full absolute -top-2 -right-3'><p className='text-sm'>{context?.cartCount
                            }</p>
                            </div>
                        </Link>)
                    }


                    <div>
                        {
                            user?._id ? (
                                <button className='px-3 btn py-2 rounded-full text-white text-center' onClick={handleLogout}>Logout</button>
                            )
                                :
                                (
                                    <Link to={'/register/login'} className='px-3 btn py-2 rounded-full text-white text-center'>Login</Link>
                                )
                        }

                    </div>
                    <div className='text-3xl'>
                        <Link to={'/myOrders'}>
                        <BsBorderStyle />
                        </Link>
                    
                    </div>
                </div>
            </div>
        </header>
    );
}
