/* eslint-disable no-unused-vars */
import {
  createBrowserRouter,
  RouterProvider,
  Route , 
  Outlet,
} from "react-router-dom"

import Home from './pages/Home'
import Login from './pages/Login'
import Write from "./pages/Write";
import Single from "./pages/Single";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import './Style.scss'



const Layout = ()=>{

  return (
  <>
  <Navbar/>
  <Outlet/>
  <Footer/>
  </>
  )
}


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children:[
      {
        path: '/',
        element: <Home/>,
      },
      {
        path: '/write',
        element: <Write/>
      },
      {
        path: '/post/:id',
        element: <Single/>
      },
    ]
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  },
])


function App() {

  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App