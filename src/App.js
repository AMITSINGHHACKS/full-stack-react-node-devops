import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import { useState,useEffect } from "react";
import { useCookies } from "react-cookie";

function App() {

  const [cookie,setCookie,removeCookie]=useCookies(['token'])
  const [token,setToken]=useState('')
  const [userdata,setUserData]=useState([])
  const [post,SetPost]=useState([])
  const [authstate,setAuthstate]=useState(false)
    
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
    setAuthstate(true)
    
    
  }else{
    console.log("no cookie yet")
  }
  }
  login()
  
  
  },[])
  

  return (<>
  
{/* {!userdata && <Navbar username="guest"/>} */}
{userdata && <Navbar username={userdata.username} authstate={authstate}/>}

  <Router>
    <Routes>
      <Route path="/" element={<Home userdata={userdata} post={post}/>}></Route>
      
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
    </Routes>
  </Router>
  </>)

}

export default App;
