/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen,faTrashCan,faArrowUpRightFromSquare, faUpload, faPlus, faArrowDown, faFilter } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { Instance } from '../App';
import ReactPaginate from 'react-paginate';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import { useDispatch, useSelector } from 'react-redux';
import { setRefetch } from '../redux/userSlice';
import '../App.css'

function Applications({currentItems,leads,searchQuery,setSearchQuery}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [file, setFile] = useState(null);
  const [lead, setLeads] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  //delete leads
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
      const res = await Instance.delete(`/api/admin/deleteLead/${id}`);
      setShowDeleteModal(false);
      const mess = res?.data?.message;
      toast.success("Successfully deleted");
      dispatch(setRefetch())
      setMessage(mess)
      setSelectedItem(null);
    } catch (err) {
      setError(err)
    }
  };

  //edit leads
  const handleEdit = (lead) => {
    navigate(`/applications/edit-profile/${lead._id}`);
  };

  //bulk upload  
  const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];
  setFile(selectedFile);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await Instance.post("/api/admin/excel", formData)
      if (response.ok) {
        const jsonData = await response.json();
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error during upload:', error);
    }
  };

  //excel and pdf download
  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(leads);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'table.xlsx');
  };

  const downloadPDF = (selectedKeys) => {
    const pdf = new jsPDF();
    const filteredData = leads.map(item =>
      selectedKeys.reduce((acc, key) => {
        acc[key] = item[key];
        return acc;
      }, {})
    );
    const columns = selectedKeys;
    const rows = filteredData.map(item => selectedKeys.map(key => item[key]));
    pdf.autoTable({
      head: [columns],
      startY: 20,
    });
    pdf.autoTable({
      head: [],
      body: rows,
      startY: 30,
    });
    pdf.save('data.pdf');
  };

  return (
    <div className="" style={{backgroundColor:"#f1f5f9"}}>
      <link rel="stylesheet" type="text/css" href="/styles/Paginate.css?url" />
        <div style={{padding:"10px 0px"}} className='md:mx-5'>
            <div className="bg-white p-4 mx-1 my-1 py-1">
                <div className='flex justify-between items-center'>
                  <p className="text-md uppercase text-gray-700 font-medium px-4 py-2">Leads</p>
                  <div className='px-2 flex items-center'>
                    {file && (
                      <p className="ml-2 text-gray-400 text-xs italic">{file?.name}</p>
                    )}
                    <div className='flex items-center border border-gray-500 bg-gray-200 px-2 rounded-sm mx-2'>
                      <input type="file" id="fileInput" className='hidden absolute w-full h-full cursor-pointer' accept=".xlsx" onChange={handleFileChange} />
                      <label htmlFor="fileInput" className="text-xs italic px-1" >{file? file.name:"Select"}</label>
                      <button className='px-2 rounded cursor-pointer my-1' onClick={handleUpload}><FontAwesomeIcon icon={faUpload} size="xs" /></button>
                    </div>
                    <button className='border border-gray-500 px-2 rounded-sm mx-2 py-2 italic text-xs'><Link to='/student-registration'>Add <FontAwesomeIcon className='px-1' icon={faPlus} /></Link></button>
                  </div>
                </div>
                <hr className='my-2' />
                <div className='flex justify-between items-center px-2 mt-4 mb-2'>
                  <div>
                    <button className='border border-gray-100 px-2 rounded-sm mx-2 text-xs bg-yellow-300 py-1 font-regular' onClick={downloadExcel}>Excel <FontAwesomeIcon icon={faArrowDown} size="xs" className='px-1' /></button>
                    <button className='border border-gray-100 px-2 rounded-sm mx-2 text-xs bg-red-300 py-1 fond-regular' onClick={() => downloadPDF(['firstName', 'number', 'country','email'])}>Pdf <FontAwesomeIcon icon={faArrowDown} size="xs" className='px-1' /></button>
                  </div>
                  <div>
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='border border-gray-500 px-2 rounded-sm text-xs py-1' placeholder='Search' />
                  </div>
                </div>
                <div className="px-0 pt-2">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                              <th scope="col" className="px-6 py-3 border border-gray-300">
                                Name
                              </th>
                              <th scope="col" className="px-6 py-3 border hidden md:table-cell border-gray-300">
                                country
                              </th>
                              <th scope="col" className="px-6 py-3 border hidden md:table-cell border-gray-300">
                                Status
                              </th>
                              <th scope="col" className="px-6 py-3 border hidden md:table-cell border-gray-300">
                                Lead Source
                              </th>
                              <th scope="col" className="px-6 py-3 border hidden md:table-cell border-gray-300">
                                Lead Stage
                              </th>
                              <th scope="col" className="px-6 py-3 border border-gray-300">
                                Options
                              </th>
                            </tr>
                          </thead>
                            <tbody>
                              {currentItems.map((item)=>(      
                                <tr key={item?._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                  <td className="px-6 py-2 text-gray-700 border border-gray-300 capitalize">{item?.firstName}</td>
                                  <td className="px-6 py-2 border border-gray-300 hidden md:table-cell capitalize">{item?.country}</td>
                                  <td className="px-6 py-2 border border-gray-300 hidden md:table-cell">{item?.leadStatus}</td>
                                  <td className="px-6 py-2 border border-gray-300 hidden md:table-cell capitalize">{item?.leadSource}</td>
                                  <td className="px-6 py-2 border border-gray-300 hidden md:table-cell">{item?.leadStage}</td>
                                  <td className="px-6 py-2 border border-gray-300">
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
                </div>
            </div>
            {/* delete modal */}
            {showDeleteModal && (
              <div className="modal-overlay fixed w-full h-screen top-0 left-0 right-0 bottom-0 flex justify-center items-center" style={{backgroundColor: "rgba(0,0,0,0.4)"}}>
                <div className="modal-content bg-white w-[40%] shadow-md rounded py-2 px-2">
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
    </div>
  )
}

function PaginatedItems() {
  const { actions } = useSelector((store) => store.user)
  const itemsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState('');
  const [leads, setLeads] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = leads?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(leads.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % leads.length;
    setItemOffset(newOffset);
  };

  //admin page 
  const {user} = useSelector((state)=>state.user)
  const [adminLeads, setAdminLeads] = useState([]);
  const currentAdminItems = adminLeads?.slice(itemOffset, endOffset);
  const adminPageCount = Math.ceil(adminLeads?.length / itemsPerPage);
  const handleAdminPageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % adminLeads.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const apiPromises = [
      Instance.get(`/api/admin/getAllLeads?query=${searchQuery}`),
    ];
    Promise.all(apiPromises).then((responses) => {
      const [
        leadsData,
      ] = responses;
      setLeads(leadsData?.data?.leads);
    });
  }, [actions,searchQuery]);

  return (
    <>
      <Applications currentItems={currentItems} leads={leads}  searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <div className='flex justify-center mb-4'>
        <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        />
      </div> 
      </>
    );
  }
  
  export default PaginatedItems
