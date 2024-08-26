

import react from 'react';
import { IoMdClose } from "react-icons/io";
import { useState } from 'react';
import { toast } from 'react-toastify';

const ChangeUserRole = ({name , email , role , onClose , userId , callfunction}) =>{

    const [userRole , setUserRole] = useState(role);
    

    function handleOnChange(e){
        setUserRole(e.target.value);
        
    }

    const updateUser = async() =>{
   const user = await fetch(
    'https://e-commerce-backend-c2it.onrender.com/api/update-user', 
   {
    method:"post",
    credentials:"include",
    headers:{
        "Content-Type" : "application/json"
    },
    body: JSON.stringify({
        userId,
        role:userRole
    })
   }
)

   const response = await user.json();

   if(response.success){
    toast.success(response.message)
    onClose();
    callfunction()
   }

   console.log("role ",response);
    }

    return(<>
    <div className='fixed top-0 bottom-0 left- 0 right-0 w-full h-full z-10 flex justify-between items-center  bg-slate-200 bg-opacity-50' >
        <div className='mx-auto bg-white p-4 w-full max-w-sm custom-role'>

            <button className='block ml-auto' onClick={onClose}>
      <IoMdClose/>
            </button>

          <h1 className='pb-4 text-lg font-medium'>Change User role</h1>

          <p>Name :{name}</p>
          <p>Name :{email}</p>
          <div className='flex items-center justify-between my-4'>
          <p>Role   :</p>
          <select className='border px-4 py-1' onChange={handleOnChange} value={userRole}>
            
                <option value="ADMIN" key="ADMIN">ADMIN</option>
                <option value="GENERAL" key="GENERAL">GENERAL</option>
       
          </select>
          </div>
          <button className='w-fit mx-auto block cursor-pointer  p-2 rounded-full py-1 px-3 text-white' style={{backgroundColor:"#E37383"}} onClick={updateUser}>Change Role</button>
        </div>
    </div>
    </>)
}

export default ChangeUserRole;