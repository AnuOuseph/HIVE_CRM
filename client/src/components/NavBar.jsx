/* eslint-disable react/prop-types */
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faChevronRight,faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faBars, faProjectDiagram, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

function NavBar({onMenuToggle}) {
  const {user} = useSelector((state)=>state.user)
  return (
    <div className="w-full h-16 flex justify-between items-end px-0 sticky top-0 z-50" style={{backgroundColor:"#262b2e"}}>
      <div className='h-16 w-full flex justify-between items-center' style={{backgroundColor:"#262b2e"}}>
      <div className='flex justify-center items-center'>
        <button className="flex items-center justify-center mx-6 md:hidden" onClick={onMenuToggle}>
          <FontAwesomeIcon style={{ fontSize: "16px", color: "#FE6E49" }} icon={faBars} />
        </button>
        <FontAwesomeIcon icon={faProjectDiagram} className='md:ml-4' style={{fontSize: "16px", color: "#FE6E49"}}/>
        <p className='text-gray-100 uppercase tracking-widest text-md font-medium mx-2'>hive</p>
      </div>
        <div className='flex items-center mx-4'>
          <div className="rounded-full w-8 h-8 flex justify-center items-center border shadow-md">
            <FontAwesomeIcon style={{ fontSize: "16px", color: "#FE6E49" }} icon={faUser} />
          </div>
          <div className='px-2'>
            <p className='capitalise tracking-wider font-regular text-sm text-gray-100'>{user?.name}</p>
            <p className='capitalize text-xs font-regular text-gray-300'>Manager</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
