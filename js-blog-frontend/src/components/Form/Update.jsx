import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const url = "http://localhost:3000"
  
const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};
function Update(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [base64,setbase64] = useState("");
    const [title,setTitle] = useState("");
    const [blogContent,setContent] = useState("");
    useEffect(()=>{
        async function getBlog(){
            console.log("use effect");
            const res = await axios.get(url+"/view/" + id);
            setContent(res.data[0].blog_content);
            setTitle(res.data[0].title);
            const base64Image = arrayBufferToBase64(res.data[0].image.data); 
            setbase64(`data:image/jpeg;base64,${base64Image}`);
        }
        getBlog();
    },[]);
    async function updateBlog(event){
        event.preventDefault();
            const res = await axios.put(url + "/edit/" + id,{"image":base64.split(",")[1],
                "title":title,
                "blog_content":blogContent,
            },{ headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }});
        
        
       
        navigate("/");
    }
    
    
return (
    
    <>
    <div className="hero">
    <h1>Update Blog</h1>
    </div>
    <div className="formEncloser">
    <form>
        <label for="title">Blog Title</label>
        <input name="title" id="title" type="text" onChange={(e)=>setTitle(e.target.value)}  value={title} required></input>
        <label for="content">Blog Content</label>
        <textarea rows={10} type="text"  onChange={(e)=>setContent(e.target.value)} value={blogContent} required></textarea>
        <label for="image">Upload Image</label>
        <input type="file" className="fileUpload" required onChange={(event)=>{
            console.log("changed");
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = function(event) {
            const base64String = event.target.result;
            setbase64(base64String);
            }
            if (file) {
        reader.readAsDataURL(file);
    }
        }}></input>
        <input  type="submit" value={"Update Blog"} className="primary-btn" onClick={updateBlog} />
    </form>
    </div>
    </>
)
}
export default Update;