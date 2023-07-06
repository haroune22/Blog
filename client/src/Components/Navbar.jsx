/* eslint-disable no-unused-vars */


import { useContext, useState } from "react";
import { Link } from "react-router-dom"
import { AuthContext } from "../Context/authContext";
import Logo from "../img/logo1.png";

const Navbar = () => {
  const {currentUser,logout}=useContext(AuthContext)


  return (
    <div className="navbar">
    <div className="container">
      <div className="logo">
        <Link to="/">
        <img src={Logo} alt="" />
        </Link>
      </div>
      <div className="links">
        <Link className="link" to="/?cat=art">
          <h6>ART</h6>
        </Link>
        <Link className="link" to="/?cat=science">
          <h6>SCIENCE</h6>
        </Link>
        <Link className="link" to="/?cat=technology">
          <h6>TECHNOLOGY</h6>
        </Link>
        <Link className="link" to="/?cat=cinema">
          <h6>CINEMA</h6>
        </Link>
        <Link className="link" to="/?cat=design">
          <h6>DESIGN</h6>
        </Link>
        <Link className="link" to="/?cat=food">
          <h6>FOOD</h6>
        </Link>
        <span className="name">{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout} className="write">Logout</span>
          ) : (
            <Link className="link" to="/login">
             <span className="write">Login</span>
            </Link>
          )}
        <span className="write">
          <Link className="link" to="/write">
            Write
          </Link>
        </span>
      </div>
    </div>
  </div>
  )
}

export default Navbar