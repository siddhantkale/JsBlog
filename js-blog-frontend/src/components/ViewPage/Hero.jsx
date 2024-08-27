import React from 'react';
import { useParams } from 'react-router-dom';
function contentShortener(content){
    if(content.length>150){
        return content.substring(0,150) + "...";
    }
    return content;
}


function Hero(props){
    return (<div className="hero" >
            <h1>{props.title}</h1>
            <span>{props.date_created}</span>
        </div>);
}
export default Hero;