import React from 'react'
import { useState,useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import Fail from '../components/Toasts/Fail'
export default function Login() {
    const [authstate,setAuthstate]=useState(false)
    const [status,SetStatus]=useState(true)
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [cookie,setCookie]=useCookies(['token'])
    const [token,setToken]=useState('')
    const [userdata,setUserData]=useState([])
    const [post,SetPost]=useState([])
    const [errmsg,setErrmsg]=useState('')
  const navigate=useNavigate()
  const closebtn=async()=>{
    SetStatus(true)
  }
    async function savecookie(token){

      
      console.log(token)
      const tokenvalue=await token
   setCookie('token',token,{path:'/'})
   setCookie('token',token,{path:'/'})
    }
  
    useEffect(()=>{
      // console.log((cookie.token).length())
  async function login(){
  if (cookie['token']){
    if ((cookie.token).length>7){
      setAuthstate(cookie.token)
      const login=await fetch('https://devbackend-xsjo.onrender.com/verifytoken',{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          "token":cookie.token
        })
      })
      const data=await login.json(login)
      setUserData(data)
      SetPost(data.posts)
    }
    setAuthstate(true)
    navigate("/")
    
  }else{
    setErrmsg('you are not logged in yet')
    console.log("no cookie yet")
  }
  }
  login()
  
  
  },[])
  
  
    const TriggerLogin=async(e)=>{
      e.preventDefault();
      const login=await fetch('https://devbackend-xsjo.onrender.com/login',{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          "username":username,
          "password":password
        })
      })
      const output=await login.json(login)
      // alert(login.status)
      setToken(output.token)
  
  
    //  alert(JSON.stringify(output.token))
    if (login.status === 200){
      savecookie(output.token)
      // const expires=new Date()
      // expires.setTime(expires.getTime()+(30*60*1000))
      window.location.reload()
      authstate(true)
      navigate("/")
      
    }
    else{
      SetStatus(false)
      setCookie('403')
      setErrmsg(output.token)
    }

    }
    return (
     <>
   <center>
   {!status &&  <div id="toast-danger" class="mt-10 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow " role="alert">
    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg ">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
        </svg>
        <span class="sr-only">Error icon</span>
    </div>
    <div class="ml-3 text-sm font-normal">{errmsg}</div>
    <button onClick={closebtn} type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 " data-dismiss-target="#toast-danger" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
    </button>
</div>}
  <form onSubmit={TriggerLogin}>
   
  <input className='block  mt-10 w-full max-w-xs p-4 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-md focus:ring-blue-500 focus:border-blue-500 ' type="text" placeholder="your username" value={username} onChange={(e)=>{setUsername(e.target.value)}}></input>
  <input className='block  mt-5 w-full max-w-xs p-4 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-md focus:ring-blue-500 focus:border-blue-500 ' type="text" placeholder="your password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
  <button type="submit" className='mt-10 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>
    Login
  </button>
  <br>
  </br>
  <p>
    Don't have an account?
<a href='/register' className=' text-blue-700'>Signup here!</a></p>
  </form>
  
   </center>
     
     </>
    );
}
