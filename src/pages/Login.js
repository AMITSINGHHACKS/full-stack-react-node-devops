import React from 'react'
import { useState,useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import Solar from '../public/images/solar.webm'
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
      const login=await fetch('http://172.172.232.251:5000/verifytoken',{
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
      const login=await fetch('http://172.172.232.251:5000/login',{
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
      
   <video  autoPlay muted loop id='Solarplanet'>
     <source src={Solar} />
 </video>
 <br></br>
 <br></br>
 <br></br>
 <br></br>
 <br></br>
 <br></br>
<div className=' '>
{/* <h1 class="text-6xl  mb-10 font-extrabold pb-5 h-full text-transparent bg-clip-text bg-gradient-to-br  from-blue-700 to-cyan-300">
  Login to Begin
</h1> */}
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
   
  <input className='block  mt-10 w-full max-w-xs p-4 text-white border border-gray-300 rounded-lg bg-white sm:text-md border-none focus:ring-blue-500 bg-opacity-10 focus:border-none' type="text" placeholder="your username" value={username} onChange={(e)=>{setUsername(e.target.value)}}></input>
  <input className='block  mt-5 w-full max-w-xs p-4 text-white border border-gray-300 rounded-lg bg-white sm:text-md border-none focus:ring-blue-500 bg-opacity-10 focus:border-none ' type="text" placeholder="your password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
  <button type="submit" className='mt-10 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-none rounded shadow'>
    Login
  </button>
  <br>
  </br>
  <p className='text-white mt-8'>
    <span className='h-10 w-1/ p-3 rounded-xl'>
    Don't have an account? </span>
    <span className='ml-1 h-10 w-1/ bg-white bg-opacity-10 p-3 rounded-xl'>
<a href='/register' className='mx-4 text-blue-300'>Signup here!</a></span></p>
  </form>
</div>
  
   </center>
     
     </>
    );
}
