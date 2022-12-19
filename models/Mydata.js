const mongoose = require("mongoose");
const MydataSchema = new mongoose.Schema({
    uname:{
        type:String,
        required:true
           },
    work:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
         },
    mobile:{
        type:Number,
        required:true
           },
    address:{
        type:String,
        required:true
      
    }
});

const myData = mongoose.model("MyData",MydataSchema);
module.exports =myData;