import express from "express";
import bodyParser from "body-parser";


const PORT = 3000;
const app = express();

app.get("/",(req,res)=>{
    return "hello world";
});

app.listen(PORT,()=>{
    console.log("Server running");
});