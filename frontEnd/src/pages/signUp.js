import './login.css'
import user from '../images/user.png';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import {toast} from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';


const SignUp = () => {

    const navigate = useNavigate();
    let [showPassword, setShowPassword] = useState(false);
    let [showCPassword, setShowCPassword] = useState(false);
    const baseUrl = "https://e-commerce-backend-c2it.onrender.com/api/signup";

    let [data, setdata] = useState({
        email: "",
        password: "",
        confirmPassword :"",
        name:""
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setdata(prev => { return { ...prev, [name]: value } });

    }

    const handleSubmit =async(e) => {
    e.preventDefault();

    if(data.password === data.confirmPassword){

        const user = await fetch(baseUrl , {
            method:"post",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        })
    
        const response = await user.json();

        if(response.success) {
            toast.success(response.message)
           navigate('/register/login')
        }
        if(response.error) toast.error(response.message)
       
    }

    else{
     console.log("please make sure password and confirm password are same");
    }
    
    

    }

    return (<>
        <section className="mt-3">
            <div className="mx-auto container px-4">
                <div id="login" className="bg-white px-6 py-1 w-full max-w-md mx-auto rounded">
                    <div className="w-20 h-20 mx-auto ">
                        <img src={user} alt='user'/>
                    </div>
                    <form className='pt-1' onSubmit={handleSubmit} >

                        <div>
                            <label>Name : </label>
                            <div className="bg-slate-100 p-2 mb-2"><input type='text' name="name" placeholder="Enter name" onChange={handleChange} className="w-full h-full outline-none bg-transparent" value={data.name}/></div>

                        </div>

                        <div>
                            <label>Email</label>
                            <div className="bg-slate-100 p-2 mb-2"><input type='email' name="email" placeholder="Enter email" onChange={handleChange} className="w-full h-full outline-none bg-transparent" value={data.email} /></div>

                        </div>

                        <div>
                            <label>Password</label>
                            <div className="bg-slate-100 p-2 flex mb-2"><input name="password" type={showPassword ? "text" : "password"} onChange={handleChange} placeholder="Enter password" className="w-full h-full outline-none bg-transparent" value={data.password}/>
                                <div onClick={() => setShowPassword(!showPassword)} className='cursor-pointer'> {
                                    showPassword ? <FaEyeSlash /> : <FaEye />
                                }</div>

                            </div>

                        </div>

                        <div>
                            <label>Confirm Password</label>
                            <div className="bg-slate-100 p-2 flex"><input name="confirmPassword" type={showCPassword ? "text" : "password"} onChange={handleChange} placeholder="Enter password" className="w-full h-full outline-none bg-transparent" value={data.confirmPassword}/>
                                <div onClick={() => setShowCPassword(!showCPassword)} className='cursor-pointer'> {
                                    showCPassword ? <FaEyeSlash /> : <FaEye />
                                }</div>

                            </div>

                        </div>
                        <div className='flex items-center justify-center' >
                            <button className='login-btn rounded text-lg px-6 py-2 w-full max-w-[250px] text-white hover:scale-110 transition-all mx-auto block mt-6' type='submit'>Sign Up</button>
                        </div>

                        <div>
                            <p className='my-5'>Already have account ? <Link to={"/register/login"} className='sign-up'>Login</Link> </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </>)


}

export default SignUp;