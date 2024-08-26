import './login.css'
import user from '../images/user.png';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Context from '../context';

export default function Login() {

    let [showPassword, setShowPassword] = useState(false);
    const baseUrl = "https://e-commerce-backend-c2it.onrender.com/api/login";
    const navigate = useNavigate();
    const {fetchUserDetails , fetchCount} = useContext(Context)

    let [data,setdata]=useState({
        email:"",
        password:""
    });

    const handleChange =e =>{
        
        const {name , value} = e.target;
        setdata(prev =>{ return {...prev,[name]:value}});
      
    }

    const handleSubmit = async (e) =>{
        
        e.preventDefault();
        const user = await fetch(baseUrl , {
            method:"post",
            credentials:'include',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        })
    
        const response = await user.json();

        if(response.success) {
            toast.success(response.message);
            fetchCount();
            fetchUserDetails()
            navigate('/')
           
        }
        if(response.error) toast.error(response.message)
       
      
    }

    return (<>
        <section className="mt-3">
            <div className="mx-auto container px-4">
                <div id="login" className="bg-white p-6 w-full max-w-md mx-auto rounded">
                    <div className="w-20 h-20 mx-auto ">
                        <img src={user} alt='user' />
                    </div>
                    <form className='pt-6' onSubmit={handleSubmit}>

                        <div>
                            <label>Email</label>
                            <div className="bg-slate-100 p-2 mb-4"><input type='email' name="email" placeholder="Enter email" onChange={handleChange} className="w-full h-full outline-none bg-transparent" /></div>

                        </div>

                        <div>
                            <label>Password</label>
                            <div className="bg-slate-100 p-2 flex"><input name="password" type={showPassword ? "text" : "password"} onChange={handleChange} placeholder="Enter password" className="w-full h-full outline-none bg-transparent" />
                                <div onClick={() => setShowPassword(!showPassword)} className='cursor-pointer'> {
                                    showPassword ? <FaEyeSlash /> : <FaEye />
                                }</div>

                            </div>
                            <p><Link to={"/forgot-password"} className='block w-fit ml-auto text-blue-600 hover:underline hover:text-blue-600'>forgot password</Link></p>
                        </div>
                        <div className='flex items-center justify-center' >
                            <button className='login-btn rounded text-lg px-6 py-2 w-full max-w-[250px] text-white hover:scale-110 transition-all mx-auto block mt-6' type='submit'>Login</button>
                        </div>

                        <div>
                            <p className='my-5'>Don't have account ? <Link to={"/register/sign-up"} className='sign-up'>Sign Up</Link> </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </>)
}