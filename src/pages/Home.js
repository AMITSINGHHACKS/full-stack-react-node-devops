import React from 'react'
import Login from './Login'
import Toast from '../components/Toast'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import CardList from '../components/CardList';
import Solar from '../public/images/solar.webm'
import Addtask from '../components/Addtask';
import { useState } from 'react';
export default function Home(props) {
  const [posts,SetPost]=useState([])
  const navigate=useNavigate();
  useEffect(()=>{
    if (props.authstate){
     
      
      navigate("/")
      // console.log(JSON.stringify(props.userdata.posts))
      

    
  }
 
 
  
 },[])
  return (
   <>
     
     <video  autoPlay muted loop id='Solarplanet'>
     <source src={Solar} />
 </video>





 <br></br>
 <br></br>
   <div className='cardContainer py-9 my-9'>
   <CardList posts={props.userdata.posts} username={props.userdata.username} authstate={props.authstate}/>
   </div>
 
   <br>
   </br>
   <div className='bottom'>
    <img src='./sphere.png'></img>
   </div>
   <footer className='copyright'>
<h2 className='text-center text-white'>Made by Aniket</h2>
<h2 className='text-center text-white'>©2023</h2>
   </footer>
   </>
  )
}
