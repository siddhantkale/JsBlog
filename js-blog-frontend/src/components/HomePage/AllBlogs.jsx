import React, { useEffect,useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { Link } from "react-router-dom";

const url = "http://localhost:3000/getBlogs";

function AllBlogs(){
    const [blogs,setBlogs] = useState([]);
    useEffect( ()=>{
        async function getBlogs(){
            const response = await axios.get(url);
             setBlogs(response.data);
        }
        getBlogs();
    },[]);
    return (
        <div className="content">
            <h2>
                Recent Blogs
            </h2>
            <div className="blogs">
            {
                blogs.map((blog)=> <Blog id={blog.id} 
                title={blog.title} key={blog.id} 
                date_created={blog.date_created} 
                blog_content={blog.blog_content} image={blog.image} />)
            }
            <button className="primary-btn" > <Link to="/create" style={{textDecoration:'none',color:'inherit'}}>Create Post </Link></button>
            </div>
        </div>
    );
}
export default AllBlogs;