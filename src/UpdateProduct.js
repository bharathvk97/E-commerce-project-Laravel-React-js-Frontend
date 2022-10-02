import {useParams} from 'react-router-dom';
import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
const UpdateProduct = ()=>{
    
    let params = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const[name,setName] = useState("");
    const[file,setFile] = useState(null);
    const[price,setPrice] = useState("");
    const[description,setDescription] = useState("");
    const [validationError,setValidationError] = useState({})
    
    useEffect(()=>{
       
        getData();

    },[])
    
    async function getData(){
        let result =  await fetch("http://localhost:8000/api/getsingleproduct/"+params.id);
        let results = await result.json();
        localStorage.setItem("product-info",JSON.stringify(results));
        const localdata =  JSON.parse(localStorage.getItem('product-info'));
        setData(results);
        setName(results.name);
        setDescription(results.description);
        setPrice(results.price);
        setFile(results.file_path)
    }
    async function updateproducts($id){
        let item = {name,file,price,description};
        const formData = new FormData();
        formData.append("file",file);
        formData.append("name",name);
        formData.append("price",price);
        formData.append("description",description);
        let result = await fetch("http://localhost:8000/api/updateproduct/"+$id,{
            method:"POST",
            mode: 'no-cors',
            body:formData
        });
       navigate("/list");

    }
    
    return(
        <div className="col-sm-6 offset-sm-3">
        <h1>Update Products</h1>
        <img style={{width:100}} src={"http://localhost:8000/"+data.file_path}/><br />
        <input type="text" placeholder="Name" defaultValue={data.name} onChange={(e)=>setName(e.target.value)} className="form-control" /><br />
        <input type="file"  id = "imagefile" name ="file" placeholder="File" accept="image/png, image/jpeg" defaultValue={data.file_path} onChange={(e)=>{setFile(e.target.files[0]); console.warn("File Name",e.target.files.name)}} /><span id='val'></span>
        <label id="filename">{data.file_path}</label><br />
        <input type="text" placeholder="Price" defaultValue={data.price} onChange={(e)=>{setPrice(e.target.value);console.warn(e.target.value)}} className="form-control" /><br />
        <input type="text" placeholder="Description" defaultValue={data.description} onChange={(e)=>{setDescription(e.target.value);}} className="form-control" /><br />
        <button className="btn btn-primary" onClick = {()=>updateproducts(params.id)}>Update Product</button>
        </div>
    )
}
export default UpdateProduct;