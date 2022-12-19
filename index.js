require("dotenv").config()
const express = require("express");
const app=express();
const mongoose = require("mongoose");
const cors = require("cors");
const myData = require("./models/Mydata");
const router = require("./routes/router");
const PORT = process.env.port || 3003
const path =require("path")
const DB = process.env.MONGO_DB
app.use(express.json());
app.use(cors());
app.use(router);

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> console.log("connection start")).catch((error)=> console.log(error.message));

app.use(express.static(path.join(__dirname, "./build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});
app.listen(PORT,()=>{
    console.log("server running")
});