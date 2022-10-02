import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Login(props){//components passed values will get through props
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            navigate("/list");
        }
    },[])
    async function login(){
        let item = {email,password};
        let result = await fetch("http://localhost:8000/api/login",{
            method:"POST",
            body:JSON.stringify(item),
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        })
        
        result =  await result.json();
        localStorage.setItem("user-info",JSON.stringify(item));
        const localdata =  JSON.parse(localStorage.getItem('user-info'));
        if(result.status ==="success" && localdata.email && localdata.password && Object.keys(localStorage.getItem('user-info')).length !== 0){
            props.handlelogin(true);
            navigate("/list");
        }
    }
    return(
      
        <div>
            <h1>Login Page</h1>
            <div className="col-sm-6 offset-sm-3">
            <input  type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} className="form-control"/><br />
            <input  type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} className="form-control"/><br />
            <button className="btn btn-primary" onClick={login}>Sign In</button>
            </div>
        </div>
    )
}
export default Login