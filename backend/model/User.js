const mongoose=require('mongoose')

const UserPeople=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        min:8
    },
    posts:{
        type:Array,
    }

})


module.exports=mongoose.model("User",UserPeople)