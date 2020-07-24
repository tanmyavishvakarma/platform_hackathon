const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        max:255,
        min:6
    },
   
    email:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    contact:{
        type:Number,
        min:9,
        max:999999999
    },
    
    password:{
        type:String,
        required:true,
        max:1024,
        min:8
    },
    date:{
        type:Date,
        default:Date.now
    },
    products:{
        type:Array,
        "default":[],
        max:1024,
        min:6
    },
    budget:{
        type:Number,
        min:3,
        max:999999999
    }
});

module.exports=mongoose.model('User',userSchema);