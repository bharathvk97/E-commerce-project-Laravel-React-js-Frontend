import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function AddProduct(){
    const[name,setName] = useState("");
    const[file,setFile] = useState("");
    const[price,setPrice] = useState("");
    const[description,setDescription] = useState("");
    const navigate = useNavigate();

    async function addproduct(){
        let item = {name,file,price,description};
        const formData = new FormData();
        formData.append("file",file);
        formData.append("name",name);
        formData.append("price",price);
        formData.append("description",description);
        let result = await fetch("http://localhost:8000/api/addproduct",{
            method:"POST",
            mode: 'no-cors',
            body:formData
        });
        navigate("/list");
    }
    return(
        <div>
            <h1>Add Products</h1>
            <div className="col-sm-6 offset-sm-3">
            <input type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)} className="form-control" /><br />
            <input type="file" placeholder="File" onChange={(e)=>setFile(e.target.files[0])} className="form-control" /><br />
            <input type="text" placeholder="Price" onChange={(e)=>setPrice(e.target.value)} className="form-control" /><br />
            <input type="text" placeholder="Description" onChange={(e)=>setDescription(e.target.value)} className="form-control" /><br />
            <button className="btn btn-primary" onClick={addproduct}>Add Product</button>
            </div>
        </div>
    )
}
export default AddProduct