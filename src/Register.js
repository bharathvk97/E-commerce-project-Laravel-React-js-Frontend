import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Register(){
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] =useState("");
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            navigate("/add");
        }
    },[])

    async function signup(){
        //console.warn(name,password,email);
        let item = {name,email,password}
        console.warn(item);

        let result = await fetch("http://localhost:8000/api/register",{
            method:"POST",
            body:JSON.stringify(item),
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        })
        result = await result.json();
        console.warn("result",result);
        localStorage.setItem("user-info",JSON.stringify(result));
        if(localStorage.getItem('user-info')){
            navigate("/add");
        }
       

    }
    return(
        <>
        
        <div className="col-sm-6 offset-sm-3" >
            
            <h1>Registration Page</h1>
            <input type="text" value={name} onChange= {(e)=>setName(e.target.value)} className="form-control" placeholder="Name" /><br />
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Email" /><br />
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="Password" /><br />
            <button onClick={signup} className="btn btn-primary">Sign Up</button>
        </div>
        </>
    )
}
export default Register