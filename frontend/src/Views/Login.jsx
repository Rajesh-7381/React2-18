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
    password:"",
    rememberMe:false
  });
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const response=await axios.post("http://localhost:8081/login",{...loginData,rememberMe: loginData.rememberMe});
      console.log(response.data);
      if(loginData.rememberMe){
        document.cookie=`token=${response.data.token}; expires=${new Date(Date.now() + 604800000).toUTCString}; path=/`;
      }
      navigate('/dashboard');
      // alert("1");
    }catch(error){
      if(error.response && error.response.status===401){
        setErrorMessage("Invalid email or password. Please try again.");
      }
      else {
        console.log("error", error);
        setErrorMessage("An unexpected error occurred. Please try again later.");
      }
      // alert("2");
    }
  }
  const handleChange=(e)=>{
    const {name,value,type,checked}=e.target;
    const newvalue=type==='checkbox' ? checked : value;
    // SetLoginData({...loginData,[e.target.name]:e.target.value});
    SetLoginData({...loginData,[name]:newvalue});
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
              <div className='mb-3 row'>
                <label htmlFor="rememberMe" className="col-sm-3 col-form-label text-start">Remember Me:</label>
                <div className="col-sm-9">
                 <input type="checkbox" id="rememberMe" name="rememberMe" onChange={handleChange} />
                </div>
              </div>    
              {errorMessage && <div className="mb-3 row">
                <div className="col-sm-9 offset-sm-3 text-danger">{errorMessage}</div>
                </div>}
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
