import './App.css'
import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom'
import SignIn from './pages/SignIn'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import Dashboard from './pages/Dashboard'
import { useState } from 'react'
import Registration from './pages/Registration'
import MultiLoginAccount from './pages/MultiLoginAccount'
import Account from './pages/Account'
import StudentView from './pages/StudentView'
import EditApplication from './pages/EditApplication'
import ProtectedRoute from './protected/ProtectedRoute'
import axios from 'axios';
import PaginatedItems from './pages/Applications'

// Create an Axios instance with a base URL
export const Instance = axios.create({
  baseURL: 'https://crm-csew.onrender.com',
  timeout: 5000,
});

function App() {
  const [isMenuVisible, setMenuVisibility] = useState(false);

  const toggleMenuVisibility = () => {
    setMenuVisibility(!isMenuVisible);
  };

  const Layout = ()=>{
    return(
      <div >
        <NavBar onMenuToggle={toggleMenuVisibility} isMenuVisible={isMenuVisible}/>
        <div style={{display:'flex'}}>
          <div style={{}}>
            <SideBar onMenuToggle={toggleMenuVisibility} isMenuVisible={isMenuVisible}/>
          </div>
          <div style={{flex:8}}>
            <Outlet/>
          </div>
        </div>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "/",
          element: <ProtectedRoute><Dashboard/></ProtectedRoute>
        },
        {
          path: "/applications",
          element: <ProtectedRoute><PaginatedItems/></ProtectedRoute>
        },
        {
          path: "/student-registration",
          element: <ProtectedRoute><Registration/></ProtectedRoute>
        },
        {
          path: "/multi-login",
          element: <ProtectedRoute><MultiLoginAccount/></ProtectedRoute>
        },
        {
          path: "/account",
          element: <ProtectedRoute><Account/></ProtectedRoute>
        },
        {
          path: "/applications/profile/:id",
          element: <ProtectedRoute><StudentView/></ProtectedRoute>
        },
        {
          path: "/applications/edit-profile/:id",
          element: <ProtectedRoute><EditApplication/></ProtectedRoute>
        },
      ]
    },
    {
      path: "/signin",
      element: <SignIn/>,
    }
  ]);
  
  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
