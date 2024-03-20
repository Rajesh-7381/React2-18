import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate=useNavigate();
  useEffect(()=>{
    document.title="Login";
  },[])
  const [loginData,SetLoginData]=useState({
    email:"",
    password:""
  });
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const response=await axios.post("http://localhost:8081/login",loginData);
      console.log(response.data);
      navigate('/dashboard');
      alert("1");
    }catch(error){
      console.log("error",error);
      alert("2");
    }
  }
  const handleChange=(e)=>{
    SetLoginData({...loginData,[e.target.name]:e.target.value});
  }
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card p-4">
            <h4 className="text-center mb-4">Login Form</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 row">
                <label htmlFor="email" className="col-sm-3 col-form-label text-start">Email:</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" id="email" name="email" placeholder="example@gmail.com" onChange={handleChange} />
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="password" className="col-sm-3 col-form-label text-start">Password:</label>
                <div className="col-sm-9">
                  <input type="password" className="form-control" id="password" name="password" placeholder="*******" onChange={handleChange}/>
                </div>
              </div>
              <div className="d-grid">
                <button className="btn btn-primary btn-block" type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
