import './App.css';
import Header from './Header';
//import {BrowserRouter,Route, Switch} from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';
import Register from './Register';
import Home from './Home';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
//import Protected from './Protected';
import ProductList from './ProductList';
import { useState } from 'react';
function App() {
  const [isloggedin, setIsloggedin] = useState(false);
  const logincomponent = <Login handlelogin = {setIsloggedin} />;
  return (
    <div className="App">
      <BrowserRouter >
       <Header />
        <Routes>
          <Route exact path="/" element={<Home /> } />
            <Route path="/login" element={logincomponent} />
            <Route path="/register" element={<Register /> } /> 
            <Route path="/add"  element={<AddProduct />}/> 
            <Route path="list/update/:id"  element={<UpdateProduct />}/> 
            <Route path="/list"  element={<ProductList /> } /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
