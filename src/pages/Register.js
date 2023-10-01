import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
export default function Register() {
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [failState,setState]=useState(false)
    const [successState,setSuccesState]=useState(false)
    const [errmsg,setErrmsg]=useState('')
    const [passwordcheck,setPasswordcheck]=useState('')
    const [passwordstate,setPasswordState]=useState(true)
    let navigate = useNavigate();

    useEffect(()=>{
      if (password===passwordcheck){
        setPasswordState(false)
        setState(false)
      }
      else{
        setPasswordState(true)
        setState(true)
        setErrmsg('password does not match')
      }
    },[passwordcheck])
    const closebtn=async()=>{
      setState(false)
      setSuccesState(false)
    }
const triggerRegsiter=async(e)=>{
    e.preventDefault();
    const login=await fetch('https://devbackend-xsjo.onrender.com/register',{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          username,password
        })
      })
      const data=await login.json(login)
      if (login.status===200){
        setSuccesState(true)
        setState(false)
        setErrmsg(data.message)
      }
      else{
        setState(true)
        setSuccesState(false)
        setErrmsg(data.message)
      }
      // navigate("/login") 
}

  return (
    <>
   <center>
   {failState &&  <div id="toast-danger" class="mt-10 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow " role="alert">
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
    {successState &&  <div id="toast-success" class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow " role="alert">
    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg ">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
        </svg>
        <span class="sr-only">Check icon</span>
    </div>
    <div class="ml-3 text-sm font-normal">{errmsg}</div>
    <button onClick={closebtn} type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 " data-dismiss-target="#toast-success" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
    </button>
</div>}
   <form onSubmit={triggerRegsiter}>
<input type='text' required className='block  mt-10 w-full max-w-xs p-4 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-md focus:ring-blue-500 focus:border-blue-500 ' value={username} onChange={(e)=>{setUsername(e.target.value)}} placeholder='enter your username'>
    
</input>
<br></br>
<input type='password' required className='block w-full max-w-xs p-4 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-md focus:ring-blue-500 focus:border-blue-500 ' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='enter your password'>
    
</input>
<br></br>
<input type='password' required className='block w-full max-w-xs p-4 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-md focus:ring-blue-500 focus:border-blue-500 ' value={passwordcheck} onChange={(e)=>{setPasswordcheck(e.target.value)}} placeholder='Confirm password'>
    
</input>
<br></br><br></br>

{!passwordstate && <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow' type='submit'>Register</button>}
{passwordstate && <button disabled className='bg-red-500  hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow' type='submit'>Register</button>}

    </form>
<p>
    have an account?
<a href='/login' className=' text-blue-700'>Login here!</a></p>
   </center>
    </>
  )
}
