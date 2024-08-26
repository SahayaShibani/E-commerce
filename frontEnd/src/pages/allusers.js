import react, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdEdit } from "react-icons/md";
import ChangeUserRole from '../components/changeUserRole';


const AllUsers = () => {

    const [alluser, setAlluser] = useState([]);
    const [openUpdateUser, setOpenUpdateUser] = useState(false);
    const [updateUser , setUpdateUser] = useState({name:"" , email:"" , role:"" , userId:''})

    const fetchAllUsers = async () => {

        const fetchData = await fetch('https://e-commerce-backend-c2it.onrender.com/api/all-user', {
            method: "get",
            credentials: "include"
        })

        const dataresponse = await fetchData.json();

        if (dataresponse.success) {
            setAlluser(dataresponse.data)
        }

        if (dataresponse.error) {
            toast.error(dataresponse.message)
        }


    }

    useEffect(() => {

        fetchAllUsers()

    }, [])

    return (<>
        <div className='pb-4 bg-white p-2'>
            <table className='w-full userTable'>
                <thead>
                    <tr className='bg-black text-white'>
                    <th>S no.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created Date</th>
                    <th>action</th>
                    </tr>
                    
                </thead>
                <tbody>
                    {
                        alluser.map((user, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{user?.name}</td>
                                    <td>{user?.email}</td>
                                    <td>{user?.role}</td>
                                    <td>{moment(user?.createdAt).format('ll')}</td>
                                    <td><button className='bg-green-100 p-2 rounded-full cursor pointer hover:bg-green-500 hover:text-white' onClick={(() =>{
                                        setUpdateUser({name:user?.name , email:user?.email , role:user?.role , userId:user?._id})
                                        setOpenUpdateUser(true);
                                        })}>
                                        <MdEdit /></button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {
                openUpdateUser && (<ChangeUserRole onClose={()=>setOpenUpdateUser(false)} name={updateUser.name} email={updateUser.email} role={updateUser.role} userId={updateUser.userId} callfunction ={fetchAllUsers}/>)
            }



        </div>
    </>)
}

export default AllUsers