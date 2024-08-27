import React from "react";
import { Link } from "react-router-dom";
function contentShortener(content){
    if(content.length>150){
        return content.substring(0,150) + "...";
    }
    return content;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
        day: '2-digit',         // Day of the month (2 digits)
        month: 'short',          // Short month name (e.g., Jan, Feb)
        year: 'numeric'          // Numeric year (e.g., 2024)
    };
    
    // Create a formatter using Intl.DateTimeFormat
    const formatter = new Intl.DateTimeFormat('en-US', options);
    
    // Format the date and return
    return formatter.format(date);
}


const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};

function Blog(props){
    const base64Image = arrayBufferToBase64(props.image.data); 
    return (
        <Link to={"/view/" + props.id} style={{textDecoration:'none',color:'inherit'}}>
        <div className="blog">
        
            <img src={`data:image/jpeg;base64,${base64Image}`}></img>
            <div className="related">
            <h3>{props.title}</h3>
            <p>{contentShortener(props.blog_content)}</p>
            <span>{formatDate(props.date_created)}</span>
            </div>
          
        </div>
        </Link>
    )
    
}
export default Blog;