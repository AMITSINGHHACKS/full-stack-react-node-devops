import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
export default function Register() {
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    let navigate = useNavigate();
const triggerRegsiter=async(e)=>{
    e.preventDefault();
    const login=await fetch('http://localhost:5000/register',{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          "username":username,
          "password":password
        })
      })
      const data=await login.json(login)
      navigate("/login") 
}

  return (
    <>
   <center>
   <form onSubmit={triggerRegsiter}>
<input type='text' value={username} onChange={(e)=>{setUsername(e.target.value)}} placeholder='enter your username'>
    
</input>
<br></br><br></br>
<input type='text' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='enter your password'>
    
</input>
<br></br><br></br>
<button type='submit'>submit</button>
    </form>
   </center>
    </>
  )
}
