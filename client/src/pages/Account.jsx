import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {Instance} from '../App'

function Account() {
  const {user} = useSelector((state)=>state.user)
  const [admin, setAdmin] = useState([])
  console.log(user.adminId)
  useEffect(() => {
    const apiPromises = [
      Instance.get(`/api/admin/getAdminById/${user.adminId}`),
    ];
    Promise.all(apiPromises).then((responses) => {
      const [
        adminData,
      ] = responses;
      setAdmin(adminData?.data?.admin);
    });
  }, [user.adminId]); 
  return (
    <div className="" style={{backgroundColor:"#f1f5f9"}}>
      <div style={{padding:"20px 30px"}}>
        <div className="bg-white mx-2 my-2 py-4">
          <p className="text-xl font-medium px-10 py-8">My Account</p>
          <div className="px-10 py-2 flex justify-center items-center mb-10">
            <div className="border shadow-md w-[50%] py-20">
              <div className="flex justify-center items-center">
                <img src="/images/user-img.jpg" className="h-16 w-16 rounded-full shadow-md" alt="" />
              </div>
              <div className="flex flex-col justify-center items-center mt-5">
                <p>Name : <span className="px-4">{admin?.name}</span></p>
                <p>Email : <span className="px-4">{admin?.email}</span></p>
              </div>
              <div className="flex flex-col justify-center items-center mt-5">
                <button className='mx-2 text-xs font-bold uppercase' style={{color:"#ffc155"}}><FontAwesomeIcon icon={faPen} style={{color:"#ffc155"}} /> Upload photo</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
