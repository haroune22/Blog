/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthContextProvider  =({children})=>{
const [currentUser,setCurrentUser] =useState(JSON.parse(localStorage.getItem('user') || null))
const login = async(inputs)=>{
   const res =  await axios.post('http://localhost:3005/api/auth/login',inputs,{
        withCredentials: true,
      }
      )
      setCurrentUser(res.data)
}
useEffect(()=>{
    localStorage.setItem('user',JSON.stringify(currentUser))
},[currentUser])
const logout = async(inputs)=>{
    await axios.post('http://localhost:3005/api/auth/logout', {},
    {
      withCredentials: true,
    }
      )
      setCurrentUser(null)
}

return (
    <AuthContext.Provider value={{login,logout,currentUser}}>
        {children}
    </AuthContext.Provider>
)
}








