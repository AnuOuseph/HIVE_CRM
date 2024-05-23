/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen,faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import {Instance} from '../App'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css'

function MultiLoginAccount() {
    const [showModal, setShowModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [admin, setAdmin] = useState([])
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null);

    //delete form start
    const openDeleteModal = (item) => {
        setSelectedItem(item);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setSelectedItem(null);
        setShowDeleteModal(false);
    };

    const handleDelete = async (id) => {
        try {
            const res = await Instance.delete(`/api/admin/deleteAdmin/${id}`);
            setAdmin((prevAdmin) => prevAdmin.filter((item) => item._id !== id));
            setShowDeleteModal(false);
            const mess = res?.data?.message;
            toast.success("Successfully deleted");
            setMessage(mess)
            setSelectedItem(null);
        } catch (err) {
            setError(err)
        }
    };

    //edit form start
    const [editData, setEditData] = useState({
        name: "",
        email: "",
    });

    const openModal = (item) => {
        setSelectedItem(item);
        setEditData({
            name: item?.name || "",
            email: item?.email || "",
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedItem(null);
        setShowModal(false);
    };

    const editChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    console.log(editData)

    const handleEdit = async (id) => {
        try {
            const res = await Instance.patch(`/api/admin/updateAdmin/${id}`, editData);
            setAdmin((prevAdmin) =>
                prevAdmin.map((item) =>
                    item._id === id ? { ...item, ...res.data.admin } : item
                )
            );
            const mess = res?.data?.message;
            setShowModal(false);
            toast.success("Successfully updated");
            setMessage(mess)
            setSelectedItem(null);
        } catch (err) {
            setError(err)
        }
    };

    //add form start

    const [formData, setFormData] = useState({
        name: '',
        admin: '',
        email: '',
        designation: '',
        password: '',
        cpassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError(null)
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.password === formData.cpassword){
            try {
                const res = await Instance.post("/api/admin/createAdmin", formData)
                const newAdmin = res?.data?.user;
                const mess = res?.data?.message;
                setMessage(mess)
                setFormData({
                  admin: "",
                  name: "",
                  email: "",
                  designation: "",
                  password: "",
                  cpassword: "",
                })
                setAdmin((prevAdmin) => [...prevAdmin, newAdmin]);
                toast.success("Admin Created");
            } catch (err) {
                setError(err)
            }
        }else{
            setError("Password Doesn't match!")
        }
      };

    useEffect(() => {
        const apiPromises = [
          Instance.get("/api/admin/getAllAdmins"),
        ];
        Promise.all(apiPromises).then((responses) => {
          const [
            adminData,
          ] = responses;
          setAdmin(adminData?.data?.admins);
        });
      }, []);
  return (
    <div className="" style={{backgroundColor:"#f1f5f9"}}>
        <div style={{padding:"10px 0px"}} className='md:mx-5'>
        <ToastContainer />
            <div className="bg-white mx-2 p-4 mt-2 mb-0 pb-1">
                <p className="text-md uppercase text-gray-700 font-medium px-4 py-4">Create Admin</p>
                <hr className='my-2' />
                <div className="px-4 pt-2">
                    <div className="flex flex-wrap text-xs md:text-sm -mx-3 mb-6 py-4 bg-white px-4 shadow-md sm:rounded-lg">
                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input name="email" value={formData.email} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="email" placeholder="email address"/>
                        </div>
                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input name="name" value={formData.name} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="full name"/>
                        </div>
                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Designation <span className="text-red-500">*</span>
                            </label>
                            <input name="designation" value={formData.designation} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="designation"/>
                        </div>
                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Title<span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select name="admin" value={formData.admin} onChange={handleChange} className="block appearance-none w-full  border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-white border-gray-500" >
                                    <option value="" disabled> Title </option>
                                    <option value={true}>Admin</option>
                                    <option value={false}>User</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div> 
                        </div>
                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <input name="password" value={formData.password} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="password" placeholder="password"/>
                        </div>
                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <input name="cpassword" value={formData.cpassword} onChange={handleChange} className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="password" placeholder="password"/>
                            {error && <p className="text-red-500 text-xs italic">{error}</p>}
                        </div>
                        <div className='md:mt-4'>
                            <button onClick={handleSubmit} className="px-10 py-2 mx-3 my-2 text-white rounded" style={{backgroundColor:'#333'}}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white mx-2 my-4 pb-2">
                <p className="text-md uppercase text-gray-700 font-medium px-4 py-4">Admins</p>
                <hr className='my-2' />
                <div className="px-2 py-2">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-xs md:text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3 hidden md:table-cell">
                                        Title
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 hidden md:table-cell">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3 hidden md:table-cell">
                                        Designation
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Options
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {admin.map((item) => (
                                    <tr key={item?._id} className="bg-white text-xs md:text-sm border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4 hidden md:table-cell capitalize">
                                            {item?.admin ? "Admin" : "User"}
                                        </td>
                                        <td className="px-6 py-4 capitalize">{item?.name}</td>
                                        <td className="px-6 py-4 hidden md:table-cell">{item?.email}</td>
                                        <td className="px-6 py-4 hidden md:table-cell capitalize">{item?.designation}</td>
                                        <td className="px-6 py-4 capitalize">
                                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                <button onClick={() => openModal(item)} className='mx-2'>
                                                    <FontAwesomeIcon icon={faPen} style={{color:"#ffc155"}} />
                                                </button>
                                                <button onClick={() => openDeleteModal(item)} className='mx-2'>
                                                    <FontAwesomeIcon icon={faTrashCan} style={{color:"#fd4335"}} />
                                                </button>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* edit modal */}
            {showModal && (
                <div className="modal-overlay fixed w-full h-screen top-0 left-0 right-0 bottom-0 flex justify-center items-center" style={{backgroundColor: "rgba(0,0,0,0.4)"}}>
                    <div className="modal-content bg-white md:w-[40%] shadow-md rounded">
                        <span className="close px-5 py-5 text-xl font-bold cursor-pointer" onClick={closeModal}>
                            &times;
                        </span>
                        <p className='md:text-md text-sm font-medium text-center'>Edit Admin Details</p>
                        <div className='py-5'>
                            <div className="w-full px-5 py-2">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                    Name
                                </label>
                                <input name="name" value={editData.name} onChange={editChange} className="appearance-none block w-full text-xs text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none bg-white border-gray-500" type="text" placeholder="Name"/>
                            </div>
                            <div className="w-full px-5 py-2">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                    Email
                                </label>
                                <input name="email" value={editData.email} onChange={editChange} className="appearance-none block w-full text-xs text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none bg-white border-gray-500" type="email" placeholder="Email"/>
                            </div>
                            <div className='w-1/4 mx-5 my-2'>
                                <button onClick={() => handleEdit(selectedItem._id)} className="text-white text-xs py-2 px-6 rounded" style={{backgroundColor:'#151f49'}} >Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* delete modal */}
            {showDeleteModal && (
                <div className="modal-overlay fixed w-full h-screen top-0 left-0 right-0 bottom-0 flex justify-center items-center" style={{backgroundColor: "rgba(0,0,0,0.4)"}}>
                    <div className="modal-content bg-white md:w-[40%] shadow-md rounded">
                        <span className="close px-5 py-5 text-xl font-bold cursor-pointer" onClick={closeDeleteModal}>
                            &times;
                        </span>
                        <p className='md:text-md text-sm font-medium text-center'>Delete Admin</p>
                        <div className='py-5 flex justify-center items-center'>
                            <div className='mx-5 my-2'>
                                <p className='text-xs font-medium'><span className='hidden md:block'>Delete {selectedItem?.name}!</span>  Are you sure ?</p>
                            </div> 
                            <div className='w-1/4 mx-5 my-2'>
                                <button onClick={() => handleDelete(selectedItem?._id)} className="text-white text-xs py-2 px-6 rounded bg-red-400" >Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default MultiLoginAccount
