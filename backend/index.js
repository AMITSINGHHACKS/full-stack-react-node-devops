const express=require('express')
const cors=require('cors')
const app=express()
const mongoose=require('mongoose')
const router = require('./Router/Route')
const cookieparser=require('cookie-parser')

app.use(cors({
    credentials:true,
    origin:"http://localhost:3000"
}))
app.use(express.json())
app.use(cookieparser())
app.use(router)


mongoose.connect("mongodb+srv://admin:admin@main.abmrzf5.mongodb.net/?retryWrites=true&w=majority",{UseNewUrlParser:true}).then((r)=>{
    console.log("connected to the database")
}).then(()=>{
    app.listen(5000,()=>{
        console.log('server is running')
    })
})




