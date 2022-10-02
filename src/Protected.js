import Header from './Header';
import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Protected(props){
    let Cmp = props.Component;
    const navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem('user-info')){
            navigate("/login");
        }
    },[])
    return(
        <div>
           <Cmp />
        </div>
    )
}
export default Protected;