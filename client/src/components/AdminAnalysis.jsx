/* eslint-disable no-unused-vars */
import { faArrowTrendDown, faArrowTrendUp, faArrowUpRightFromSquare, faCheck, faPen, faTasks, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react"
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import {LinearScale,CategoryScale,BarElement,PointElement,LineElement,} from 'chart.js';

function AdminAnalysis() {
    const navigate = useNavigate()
    const {user} = useSelector((state)=>state.user)
    const [leads, setLeads] = useState([])
    const [totalLeads, setTotalLeads] = useState([])
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null);
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    //delete form start

    useEffect(() => {
        const apiPromises = [
          axios.get(`http://localhost:5000/api/admin/totalLeadsPerAdmin/${user.adminId}`),
        ];
        Promise.all(apiPromises).then((responses) => {
          const [
            leadsData,
          ] = responses;
          setLeads(leadsData?.data);
        });
      }, [user.adminId]);
      console.log("leads",leads)
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
        console.log(id)
        try {
            const res = await axios.delete(`http://localhost:5000/api/admin/deleteLead/${id}`);
            setTotalLeads((prevLead) => prevLead.filter((item) => item._id !== id));
            setShowDeleteModal(false);
            const mess = res?.data?.message;
            toast.success("Successfully deleted");
            setMessage(mess)
            setSelectedItem(null);
        } catch (err) {
            setError(err)
        }
    };

    //delete form end!
    //edit leads
    const handleEdit = (lead) => {
        navigate(`/applications/edit-profile/${lead._id}`);
      };

    useEffect(() => {
        const apiPromises = [
          axios.get(`http://localhost:5000/api/admin/getAllLeadsPerAdmin/${user.adminId}`),
        ];
        Promise.all(apiPromises).then((responses) => {
          const [
            leadsData,
          ] = responses;
          setTotalLeads(leadsData?.data?.leads);
        });
      }, [user.adminId]);
      console.log("tola",totalLeads)

      const piedata = {
        labels: ['Hot', 'Cold', 'Enrolled', 'Warm'],
        datasets: [
          {
            label: '# of Votes',
            data: [
              leads?.hotLeadCount,
              leads?.coldLeadCount,
              leads?.enrolledLeadCount,
              leads?.warmLeadCount
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.4)',
              'rgba(54, 162, 235, 0.4)',
              'rgba(255, 206, 86, 0.4)',
              'rgba(255, 159, 64, 0.4)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
    
  return (
    <>
    
        <div className="flex items-center justify-center">
            <div className="w-[100%] flex">
                <div className="w-[50%]">
                    <div className="bg-white rounded shadow shadow-md mx-4 my-2 p-6">
                        <div className="flex justify-between">
                            <div className="">
                                <p className='text-sm font-medium uppercase text-gray-500'>Total Leads</p>
                                <p></p>
                            </div>
                            <div className='rounded-full h-12 w-12 flex justify-center items-center' style={{backgroundColor:"#00ff66"}}>
                                <FontAwesomeIcon icon={faTasks} style={{width:"20px",height:"20px"}}/>
                            </div>
                        </div>
                        <div>
                            <p className='text-2xl font-semibold font-sans'>{leads?.totalLeadCount}</p>
                        </div>
                    </div>
                </div>
                <div className="w-[50%]">
                    <div className="bg-white rounded shadow shadow-md mx-4 my-2 p-6">
                        <div className="flex justify-between">
                            <div className="">
                                <p className='text-sm font-medium uppercase text-gray-500'> Lead Conversions</p>
                                <p></p>
                            </div>
                            <div className='rounded-full h-12 w-12 flex justify-center items-center' style={{backgroundColor:"#ff69b4"}}>
                                <FontAwesomeIcon icon={faCheck} style={{width:"20px",height:"20px"}}/>
                            </div>
                        </div>
                        <div>
                            <p className='text-2xl font-semibold font-sans'>{leads?.perConvert} %</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[100%] flex">
                <div className="w-[50%]">
                    <div className="bg-white rounded shadow shadow-md mx-4 my-2 p-6">
                        <div className="flex justify-between">
                            <div className="">
                                <p className='text-sm font-medium uppercase text-gray-500'>Lead Upgraded</p>
                                <p></p>
                            </div>
                            <div className='rounded-full h-12 w-12 flex justify-center items-center' style={{backgroundColor:"#ffd766"}}>
                                <FontAwesomeIcon icon={faArrowTrendUp} style={{width:"20px",height:"20px"}}/>
                            </div>
                        </div>
                        <div>
                            <p className='text-2xl font-semibold font-sans'>{leads?.perUpgrad} %</p>
                        </div>
                    </div>
                </div>
                <div className="w-[50%]">
                    <div className="bg-white rounded shadow shadow-md mx-4 my-2 p-6">
                        <div className="flex justify-between">
                            <div className="">
                                <p className='text-sm font-medium uppercase text-gray-500'>Lead Degraded</p>
                                <p></p>
                            </div>
                            <div className='rounded-full h-12 w-12 flex justify-center items-center' style={{backgroundColor:"#4285f4"}}>
                                <FontAwesomeIcon icon={faArrowTrendDown} style={{width:"20px",height:"20px"}}/>
                            </div>
                        </div>
                        <div>
                            <p className='text-2xl font-semibold font-sans'>{leads?.perDegrad} %</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='w-[30%] p-4 bg-white mx-2 my-2 rounded'>
          <p className='px-4 py-2 uppercase font-medium text-gray-600 mb-2'>Lead Status </p>
            <Pie data={piedata} />
        </div>
      
    <div>
        <div className="bg-white rounded shadow shadow-md mx-4 my-2 p-6">
        <p className='px-4 py-2 uppercase font-medium text-gray-600 mb-4'>Leads assigned </p> 
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                Name
                </th>
                <th scope="col" className="px-6 py-3">
                Lead Source
                </th>
                <th scope="col" className="px-6 py-3">
                Lead Status 
                </th>
                <th scope="col" className="px-6 py-3">
                Lead Stage
                </th>
                <th scope="col" className="px-6 py-3">
                Options
                </th>
            </tr>
            </thead>
            <tbody>
                {totalLeads?.map((item)=>(      
                    <tr key={item?._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                    {item?.firstName}
                    </th>
                    <td className="px-6 py-4">{item?.leadSource}</td>
                    <td className="px-6 py-4">{item?.leadStatus}</td>
                    <td className="px-6 py-4">{item?.leadStage}</td>
                    <td className="px-6 py-4">
                    <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                        <button className='mx-2'><Link to={`/applications/profile/${item._id}`}><FontAwesomeIcon icon={faArrowUpRightFromSquare} style={{color:"#6794dc"}} /></Link></button>
                        <button onClick={() => handleEdit(item)} className='mx-2'><FontAwesomeIcon icon={faPen} style={{color:"#ffc155"}} /></button>
                        <button onClick={() => openDeleteModal(item)} className='mx-2'><FontAwesomeIcon icon={faTrashCan} style={{color:"#fd4335"}} /></button>
                    </a>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
        </div>
        {/* delete modal */}
        {showDeleteModal && (
            <div className="modal-overlay fixed w-full h-screen top-0 left-0 right-0 bottom-0 flex justify-center items-center" style={{backgroundColor: "rgba(0,0,0,0.4)"}}>
                <div className="modal-content bg-white w-[40%] shadow-md rounded">
                    <span className="close px-5 py-5 text-xl font-bold cursor-pointer" onClick={closeDeleteModal}>
                        &times;
                    </span>
                    <p className='text-xl font-medium text-center'>Delete Lead</p>
                    <div className='py-5 flex justify-center items-center'>
                        <div className='mx-5 my-2'>
                            <p className='text-md font-medium'>Delete {selectedItem?.firstName}! Are you sure ?</p>
                        </div> 
                        <div className='w-1/4 mx-5 my-2'>
                            <button onClick={() => handleDelete(selectedItem?._id)} className="text-white py-2 px-6 rounded bg-red-400" >Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
    </>
  )
}

export default AdminAnalysis
