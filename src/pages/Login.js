import React from 'react'
import { useState,useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const [authstate,setAuthstate]=useState('not logged in')
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [cookie,setCookie]=useCookies(['token'])
    const [token,setToken]=useState('')
    const [userdata,setUserData]=useState([])
    const [post,SetPost]=useState([])
  const navigate=useNavigate()
  
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
      const login=await fetch('http://localhost:5000/verifytoken',{
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
    navigate("/")
    
  }else{
    console.log("no cookie yet")
  }
  }
  login()
  
  
  },[])
  
  
    const TriggerLogin=async(e)=>{
      e.preventDefault();
      const login=await fetch('http://localhost:5000/login',{
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
      navigate("/")
      
    }
    else{
      setCookie('403')
    }

    }
    return (
     <>
   <center>
  <form onSubmit={TriggerLogin}>
   
  <input type="text" placeholder="your username" value={username} onChange={(e)=>{setUsername(e.target.value)}}></input>
  <input type="text" placeholder="your password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
  <button type="submit">
    Submut
  </button>
  <br>
  </br>
 
  </form>
   </center>
     
     </>
    );
}
