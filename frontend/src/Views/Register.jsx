import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './All.css';

const Register = () => {
    const navigate=useNavigate();   
    useEffect(() => {
        document.title = "Register";
    }, []);

    function themechange() {
        var theme = document.getElementById("theme");
        var form = document.querySelector("form");
        if (theme.checked) {
            form.className = "border border-2 bg-dark ";
        } else {
            form.className = "border border-2  ";
        }
    }

    const [formData,setFormData]=useState({
        fname:"",
        lname:"",
        uname:"",
        email:"",
        password:"",
        cpassword:""
    });

    const [errors, setErrors] = useState({});
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationerrors = {};
        if (!formData.fname.trim()) {
            validationerrors.fname = "First name is required";
        } else if (formData.fname.length < 3) {
            validationerrors.fname = "First name should be greater than 3 characters";
        }
    
        if (!formData.lname.trim()) {
            validationerrors.lname = "Last name is required";
        } else if (formData.lname.length < 3) {
            validationerrors.lname = "Last name should be greater than 3 characters";
        }
    
        if (!formData.uname.trim()) {
            validationerrors.uname = "Username is required";
        } else if (formData.uname.length < 3) {
            validationerrors.uname = "Username should be greater than 3 characters";
        }
    
        if (!formData.email.trim()) {
            validationerrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationerrors.email = "Email is not valid";
        }
    
        if (!formData.password.trim()) {
            validationerrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            validationerrors.password = "Password must be at least 6 characters";
        }
    
        if (formData.password !== formData.cpassword && formData.password && formData.cpassword) {
            validationerrors.cpassword = "Password not matched";
        }
    
        setErrors(validationerrors);
    
        if (Object.keys(validationerrors).length === 0) {
            try {
                const response = await axios.post("http://localhost:8081/register", formData);
                console.log(response.data);
                navigate('/login');

            } catch (error) {
                console.error("Error:", error);
            }
        }
    };
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    
    return (
        <div className='container mt-4' >
      
            <div className='row justify-content-center'>
                <div className='col-sm-6'>
                    <div className='card p-4 border border-2 border-dark' id=''>
                        <div className="form-switch text-start"> {/* Added wrapping div for checkbox and label */}
                            <input type="checkbox" name="theme" id="theme" onChange={themechange} />
                            <label htmlFor="theme" className="ml-2">Dark Mode</label> {/* Added margin to the label */}
                         </div>
                        <h4 className='text-center mb-4'>Register Form</h4>
                        <form className="bg-white" onSubmit={handleSubmit}> {/* Updated form styling */}
                            <div className='mb-3 text-start'>
                                <label htmlFor="fname" className='form-label'>First Name:</label>
                                <input type="text" name="fname" id="fname" className='form-control' autoComplete='fname' onChange={handleChange}/>
                                {errors.fname && <span className='text-danger'>{errors.fname}</span>}
                            </div>
                            <div className='mb-3 text-start'>
                                <label htmlFor="lname" className='form-label'>Last Name:</label>
                                <input type="text" name="lname" id="lname" className='form-control' autoComplete='lname' onChange={handleChange}/>
                                {errors.lname && <span className='text-danger'>{errors.lname}</span>}
                            </div>
                            <div className='mb-3 text-start'>
                                <label htmlFor="uname" className='form-label'>Username:</label>
                                <input type="text" name="uname" id="uname" className='form-control' autoComplete='username' onChange={handleChange} />
                                {errors.uname && <span className='text-danger'>{errors.uname}</span>}
                            </div>
                            <div className='mb-3 text-start'>
                                <label htmlFor="email" className='form-label'>Email:</label>
                                <input type="email" name="email" id="email" className='form-control' autoComplete='email' onChange={handleChange}/>
                                {errors.email && <span className='text-danger'>{errors.email}</span>}
                            </div>
                            <div className='mb-3 text-start'>
                                <label htmlFor="password" className='form-label'>Password:</label>
                                <input type="password" name="password" id="password" className='form-control' autoComplete='new-password' onChange={handleChange}/>
                                {errors.password && <span className='text-danger'>{errors.password}</span>}
                            </div>
                            <div className='mb-3 text-start'>
                                <label htmlFor="cpassword" className='form-label'>Confirm Password:</label>
                                <input type="password" name="cpassword" id="cpassword" className='form-control' autoComplete='new-password' onChange={handleChange} />
                                {errors.cpassword && <span className='text-danger'>{errors.cpassword}</span>}
                            </div>
                            <div className='mb-3'>
                                <button type='submit' className='btn btn-primary btn-block'>Submit</button>
                            </div>
                        </form>
                        <div className='text-start'>
                           
                            Have an account? <Link to={'/login'}>Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
