import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const url = "http://localhost:3000"
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }
  
function Form(){
    const navigate = useNavigate();
    const [base64,setbase64] = useState("");
    const [title,setTitle] = useState("");
    const [blogContent,setContent] = useState("");
    async function addBlog(event){
        event.preventDefault();
        const res = await axios.post(url + "/addBlog",{"image":base64.split(",")[1],
            "title":title,
            "blog_content":blogContent,
            "date_created":formatDate(new Date),
        },{ headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }});
        console.log(res);
        navigate("/");
    }
return (
    
    <>
    <div className="hero">
    <h1>Post New Blog</h1>
    </div>
    <div className="formEncloser">
    <form>
        <label for="title">Blog Title</label>
        <input name="title" id="title" type="text" onChange={(e)=>setTitle(e.target.value)}  value={title} required></input>
        <label for="content">Blog Content</label>
        <textarea rows={10} type="text"  onChange={(e)=>setContent(e.target.value)} value={blogContent} required></textarea>
        <label for="image">Upload Image</label>
        <input type="file" className="fileUpload" required onChange={(event)=>{
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = function(event) {
        // Get the Base64 string
            const base64String = event.target.result;
            setbase64(base64String);
            }
            if (file) {
        reader.readAsDataURL(file);
    }
        }}></input>
        <input  type="submit" value={"Create Post"} className="primary-btn" onClick={addBlog} />
    </form>
    </div>
    </>
)
}
export default Form;