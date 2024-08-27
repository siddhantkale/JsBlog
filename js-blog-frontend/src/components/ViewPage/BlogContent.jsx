import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};
const url = "http://localhost:3000";

async function deleteBlog(id){
    try{
        const res = await axios.delete(url+"/delete/"+id);
        console.log(res);
    }
    catch(err){
        console.error(err);
    }
}


function BlogContent(props){
    const navigate = useNavigate();
    const base64Image = arrayBufferToBase64(props.image.data); 
    return <div className="encloser">
    <img src={`data:image/jpeg;base64,${base64Image}`}/>
    <div className="blogText">
        <p>{props.content}</p>
    </div>
    <div className="buttons">
        <button className="primary-btn" onClick={()=>{
            navigate(`/update/${props.id}`);
        }}>Update Blog</button>
        <button className="secondary-btn" onClick={()=>{
            deleteBlog(props.id);
            navigate("/");
        }}>Delete Blog</button>
    </div>
    </div>
}
export default BlogContent;