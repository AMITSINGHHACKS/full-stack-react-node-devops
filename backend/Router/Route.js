const express=require('express')
const router=express.Router()
const User=require('../model/User')
const jwt=require("jsonwebtoken")
const bcrypt=require('bcrypt')


router.get("/",(req,res)=>{
    res.json("i am working from the router")
})


router.post("/register",async(req,res)=>{
    
   const username=await req.body.username
   const password=await req.body.password
   const hashedpass=await bcrypt.hash(password,10)
   const userexists=await User.findOne({username:username})
   if (userexists){
    res.json({"message":"user already exists"})
   }
   else{
    const addusr=new User({
        username:username,
        password:hashedpass
       })
       const execute=await addusr.save()
       res.send(execute)
    
   }
})


router.post("/login",async(req,res)=>{
    const username=await req.body.username
    console.log(username)
    // console.log(username)
const user=await User.findOne({username:username})
if (user){
const validpass=await bcrypt.compare(req.body.password,user.password)
if (validpass){
    const token=await jwt.sign({username:user.username},"secret")
    res.cookie('jwt',token,{
        httpOnly:true,
        maxAge:24*60*60*1000
    })
    console.log(token)
    res.status(200).json({"token":token})

    
}
else{
    res.status(403).json({"token":"invalid username or password"})
}

}
else{
    res.status(403).json({"token":"invalid username or password"})
}
})

router.post("/post",async(req,res)=>{
    
   const username=await req.body.username
   const post=await req.body.post
    const userexists=await User.findOne({username:username})
    if (userexists){
        const pushpost= await User.updateOne({username:username},{$push:{posts:post}})
        
        res.json({"message":"success"})
}
else{
    res.status(403).json({"message":"403"})
}
})


router.post('/verifytoken',async(req,res)=>{
const token=await req.body.token
console.log(token)
const validtoken=await jwt.verify(token,"secret")
if (!validtoken){
    res.status(403).json({"status":"not authenticated"})

}
else{
    const user=await User.findOne({username:validtoken.username})
    // res.json({"status":"authenticated"}).status(200)
    const {password,...data}=await user.toJSON()
    res.json(data).status(200)
}
})


module.exports=router

