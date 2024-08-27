import Hero from './Hero';
import Footer from "../Footer"
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BlogContent from './BlogContent';
const url = "http://localhost:3000/";


function ViewPage(){
    const {id} = useParams();
    const [blog,setBlog] = useState({
        image:{data:[],type:''},
        id:'',
        title:'',
        date_created:'',
        blog_content:''
    });
    useEffect(()=>{
        async function getBlog(){
            const res = await axios.get(url+"view/" + id);
            setBlog(res.data[0]);
        }
        getBlog();
    },[]);
    return (
        <div className='viewpage'>
        <Hero title = {blog.title}  date_created={blog.date_created.substring(0,10)}/>
        <BlogContent content={blog.blog_content} image={blog.image} id={blog.id}/>
        <Footer/>
        </div>
    )
}
export default ViewPage;