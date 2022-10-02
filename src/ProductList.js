import Header from './Header';
import React,{useState,useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import {Link, useNavigate} from 'react-router-dom';
 function ProductList(){
    
    const [data, setData] = useState([]);
     const navigate = useNavigate();
    useEffect(()=>{
        getData();
        if(localStorage.getItem('user-info').email){
            window.location.href="/list"
        }
    },[])
   
    async function deleteoperation(id){
       let result =  await fetch("http://localhost:8000/api/delete/"+id,{
            method:"DELETE"

        });
        result = await result.json();
        getData();
    }
    
    async function getData(){
        let result =  await fetch("http://localhost:8000/api/productlist");
        let results = await result.json();
        setData(results);
    }
    return(
        <div>
            <h1>Product List</h1>
            <div className="col-sm-6 offset-sm-3">
                <>
            <Table>
                <tr>
                    <td>Id</td>
                    <td>Name</td>
                    <td>Description</td>
                    <td>Price</td>
                    <td>File</td>
                    <td>Operations</td>
                </tr>
                {
                    data.map((item)=>
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                            <td><img style={{width:100}} src={"http://localhost:8000/"+item.file_path}/></td>
                            <td><span onClick = {()=>deleteoperation(item.id)} className='delete-btn'>Delete</span></td>
                            <td>
                                <Link to={"update/"+item.id}>
                                    <span className='edit-btn'>Update</span>
                                </Link>
                                </td>
                        </tr>
                    )
                }
                
            </Table>
            </>
            </div>
            
        </div>
    )
}
    

export default ProductList;