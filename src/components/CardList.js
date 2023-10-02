import React from 'react'
import { useState ,useEffect} from 'react'
export default function CardList(props) {

    const [postvalue,setPostvalue]=useState('')
    const [msg,setMsg]=useState('')
    const [articles,setArticles]=useState([])
    const [deleteid,setDeleteId]=useState('')
    const [lastupdated,Setlastupdated]=useState('a')
    const currentdate = new Date()
  //  console.log(props.posts)
   
const deleteidsetter =async(value)=>{
  await setDeleteId(value)
  const sendpost=await fetch("https://devbackend-xsjo.onrender.com/deletepost",{
    method:"POST",
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      "username":props.username,
      "id":value
    })
})


const data=await sendpost.json(sendpost)
setMsg(data.message)
setPostvalue('')
Setlastupdated(currentdate.getMinutes())

}






    const TriggerForPost=async(e)=>{
e.preventDefault();
const sendpost=await fetch("https://devbackend-xsjo.onrender.com/post",{
    method:"POST",
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      "username":props.username,
      "post":postvalue
    })
})
const data=await sendpost.json(sendpost)
setMsg(data.message)
setPostvalue('')
// Setlastupdated(currentdate.getMinutes())

    }
  return (
    <>
     <div className='mx-6'>
     <div className="max-w-lg mx-auto my-10 bg-white bg-opacity-10 p-8 rounded-xl shadow shadow-slate-300">
    {!props.authstate &&  <>
     <a href='/login'>
     <h1 className='text-white text-left text-2xl  font-extrabold'>Login to View</h1>
      <br></br>
      <div><div className=" h-28 w-28 bg-white  animate-pulse bg-opacity-5 rounded-full">  </div>
          <br></br>
              <div className="h-10 w-48 bg-white  animate-pulse bg-opacity-5 rounded"></div>
          </div>
          <br></br>
          
          <div className=" h-4 w-56 bg-white  animate-pulse  bg-opacity-5 rounded"></div>
         
          
          
          
          <div className="mt-2  h-14 w-2/3 bg-white  animate-pulse bg-opacity-5 rounded"></div>
     </a>
      </>
    
    }
      
      {props.authstate && <>  <div className="flex flex-row justify-between items-center">
          
          <div>
              <h1 className="text-3xl font-medium text-white">Tasks list</h1>
          </div>






          <div className="inline-flex space-x-2 items-center">
              <a href="#" className="p-2 border border-slate-200 rounded-md inline-flex space-x-1 items-center text-white hover:text-white  hover:bg-black">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium hidden md:block">Urgent</span>                     
              </a>
              <a href="#" className="p-2 border border-slate-200 rounded-md inline-flex space-x-1 items-center hover:bg-black">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg> 
                    <span className="text-sm hidden text-white md:block">Latest</span>                    
              </a>
          </div>
      </div>

      <p className="text-white">Hello {props.username}, here are your latest tasks</p>
{/* {--------------------------------------} */}

<div className='mt-5 mb-5'>

<fom>
<div className=" relative flex h-10 w-full min-w-[200px] max-w-[28rem] mx-auto">
<input
value={postvalue}
onChange={(e)=>{setPostvalue(e.target.value)}}
  type="email"
  class="peer h-full w-full rounded-[7px] border border-white border-t-white bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border  text-white placeholder-shown:border-white placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:white focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
  placeholder="Add your task "
  required
/>
<button onClick={TriggerForPost}
  className="!absolute right-1 top-1 z-10 select-none rounded bg-white py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase  shadow-md shadow-white transition-all hover:shadow-lg hover:shadow-white focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none text-black"
  type="button"
  data-ripple-light="true"
>
  ADD
</button>
<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-white before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-white after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-transparent peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-white peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-white peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-white">
  Add task
</label>
</div>
</fom>
</div>
{/* {<p className='text-white'>{msg}</p>} */}
{/* ------------------------ */}
      {props.posts && props.posts.reverse().map((p)=>{
  return(
    
      <div id="tasks" className="my-5">
      <div id="task" className="flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent">
          <div className="inline-flex items-center space-x-2">
              <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-slate-500">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>                          
              </div>
              
              <div className='text-white'>{p.post}</div>
          </div><div>
             <button onClick={()=>{deleteidsetter(p._id)}}>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 text-slate-500 hover:text-slate-700 hover:cursor-pointer">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>     </button>                 
          </div>
          </div>
  </div>
    )
  })}

{}




      <p className="text-xs text-slate-500 text-center">Last updated {lastupdated} minutes ago</p>
</>}
          </div>
     </div>
    </>
  )
}
