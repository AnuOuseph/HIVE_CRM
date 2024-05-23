/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar,faTasks,faUserPlus,faUsers,faSignOutAlt, faClose } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

function SideBar({isMenuVisible, onMenuToggle}) {

  const [selectedItem, setSelectedItem] = useState(() => {
    return JSON.parse(localStorage.getItem('selectedItem')) || null;
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  useEffect(() => {
    localStorage.setItem('selectedItem', JSON.stringify(selectedItem));
  }, [selectedItem]);

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  return (
    <>
    <div className='hidden md:block w-auto border-r border-gray-300 sticky top-16' style={{height: 'calc(100vh - 70px)',backgroundColor:"#f9fafc"}}>
      <div className="pt-5 px-4 relative h-full">
        <div className={`rounded border my-1 p-3 py-3 ${selectedItem === 1 ? 'text-orange-600' : 'text-gray-500'}`} style={{background:`${selectedItem === 1 ? '#ffffff':"" }`}}>
          <Link
            to="/"
            className="text-md font-medium "
            onClick={() => handleItemClick(1)}
            >
            <FontAwesomeIcon style={{fontSize:'16px'}} icon={faChartBar} className="md:pr-3"/>
            <span className='text-gray-500 text-xs uppercase tracking-wider md:pr-5'>Overview</span>
          </Link>
        </div>
        <div className={`rounded border my-1 p-3 py-3 ${selectedItem === 2 ? 'text-orange-600' : 'text-gray-500'}`} style={{background:`${selectedItem === 2 ? '#ffffff':""}`}}>
          <Link
            to="/applications"
            className="text-md font-medium "
            onClick={() => handleItemClick(2)}
            >
            <FontAwesomeIcon style={{fontSize:'16px'}} icon={faTasks} className="md:pr-3"/>
            <span className='text-gray-500 text-xs uppercase tracking-wider'>Leads</span>
          </Link>
        </div>
        <div className={`rounded border my-1 p-3 py-3 ${selectedItem === 3 ? 'text-orange-600' : 'text-gray-500'}`} style={{background:`${selectedItem === 3 ? '#ffffff':""}`}}>
          <Link
            to="/student-registration"
            className="text-md font-medium "
            onClick={() => handleItemClick(3)}
            >
            <FontAwesomeIcon style={{fontSize:'16px'}} icon={faUserPlus} className="md:pr-3"/>
            <span className='text-gray-500 text-xs uppercase tracking-wider'>New Lead</span>
          </Link>
        </div>
        <div className={`rounded border my-1 p-3 py-3 ${selectedItem === 4 ? 'text-orange-600' : 'text-gray-500'}`} style={{background:`${selectedItem === 4 ? '#ffffff':""}`}}>
          <Link
            to="/multi-login"
            className="text-md font-medium "
            onClick={() => handleItemClick(4)}
            >
            <FontAwesomeIcon style={{fontSize:'16px'}} icon={faUsers} className="md:pr-3"/>
            <span className='text-gray-500 text-xs uppercase tracking-wider'>Admins</span>
          </Link>
        </div>
        <div className="rounded border my-1 p-3 py-3 text-gray-500" style={{background:''}}>
          <Link
            className="text-md font-medium "
            onClick={handleLogout}
            >
            <FontAwesomeIcon icon={faSignOutAlt} className="md:pr-3"/>
            <span className= 'text-gray-500 text-xs uppercase tracking-wider'>Logout</span>
          </Link>
        </div>
      </div>
    </div>
    {/* sidebar smallscreen */}
    {isMenuVisible && (
    <div className="fixed w-full bg-white h-screen top-0 left-0 right-0 bottom-0 z-50 p-5 md:hidden">
      <div className="flex bg-white">
        <button className="ml-auto bg-white" onClick={onMenuToggle}><FontAwesomeIcon style={{fontSize:'16px'}} icon={faClose}/> </button>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="pt-5 px-4">
          <div className={`rounded border my-2 p-3 py-3 ${selectedItem === 1 ? 'text-orange-600' : 'text-gray-500'}`} style={{background:`${selectedItem === 1 ? '#ffffff':"" }`}}>
            <Link
              to="/"
              className="text-md font-medium "
              onClick={() => { handleItemClick(1); onMenuToggle(); }}
              >
              <FontAwesomeIcon style={{fontSize:'16px'}} icon={faChartBar} className="pr-4"/>
              <span className='text-gray-500 text-xs uppercase tracking-wider pr-2'>Overview</span>
            </Link>
          </div>
          <div className={`rounded border my-2 p-3 py-3 ${selectedItem === 2 ? 'text-orange-600' : 'text-gray-500'}`} style={{background:`${selectedItem === 2 ? '#ffffff':""}`}}>
            <Link
              to="/applications"
              className="text-md font-medium "
              onClick={() => { handleItemClick(2); onMenuToggle(); }}
              >
              <FontAwesomeIcon style={{fontSize:'16px'}} icon={faTasks} className="pr-4"/>
              <span className='text-gray-500 text-xs uppercase tracking-wider pr-2'>Leads</span>
            </Link>
          </div>
          <div className={`rounded border my-2 p-3 py-3 ${selectedItem === 3 ? 'text-orange-600' : 'text-gray-500'}`} style={{background:`${selectedItem === 3 ? '#ffffff':""}`}}>
            <Link
              to="/student-registration"
              className="text-md font-medium "
              onClick={() => { handleItemClick(3); onMenuToggle(); }}
              >
              <FontAwesomeIcon style={{fontSize:'16px'}} icon={faUserPlus} className="pr-4"/>
              <span className='text-gray-500 text-xs uppercase tracking-wider pr-2'>New Lead</span>
            </Link>
          </div>
          <div className={`rounded border my-2 p-3 py-3 ${selectedItem === 4 ? 'text-orange-600' : 'text-gray-500'}`} style={{background:`${selectedItem === 4 ? '#ffffff':""}`}}>
            <Link
              to="/multi-login"
              className="text-md font-medium "
              onClick={() => { handleItemClick(4); onMenuToggle(); }}
              >
              <FontAwesomeIcon style={{fontSize:'16px'}} icon={faUsers} className="pr-4"/>
              <span className='text-gray-500 text-xs uppercase tracking-wider pr-2'>Admins</span>
            </Link>
          </div>
          <div className="rounded border my-2 p-3 py-3 text-gray-500 absolute" style={{background:''}}>
            <Link
              className="text-md font-medium "
              onClick={handleLogout}
              >
              <FontAwesomeIcon icon={faSignOutAlt} className="pr-4"/>
              <span className= 'text-gray-500 text-xs uppercase tracking-wider pr-6'>Logout</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
    )}
    </>
  )
}

export default SideBar
