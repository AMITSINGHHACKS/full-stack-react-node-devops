import React from 'react'
import Login from './Login'
import Navbar from '../components/Navbar'

export default function Home({userdata,post}) {
  
  return (
   <>
     
    <h1>{userdata.username}</h1>
  {post.map((p)=>{
    return(
      <h2>{p}</h2>
    )
  })}
   </>
  )
}
