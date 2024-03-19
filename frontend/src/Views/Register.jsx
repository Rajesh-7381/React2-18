import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8081/register", formData);
            alert("1")
            console.log(response.data);
        } catch (error) {
            console.error("error", error);
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // validations
    

    return (
        <div className='container mt-4'>
            <div className='row justify-content-center'>
                <div className='col-sm-6'>
                    <div className='card p-4 border border-2 border-dark'>
                        <div className="form-switch text-start"> {/* Added wrapping div for checkbox and label */}
                            <input type="checkbox" name="theme" id="theme" onChange={themechange} />
                            <label htmlFor="theme" className="ml-2">Dark Mode</label> {/* Added margin to the label */}
                         </div>
                        <h4 className='text-center mb-4'>Register Form</h4>
                        <form className="bg-white" onSubmit={handleSubmit}> {/* Updated form styling */}
                            <div className='mb-3 text-start'>
                                <label htmlFor="fname" className='form-label'>First Name:</label>
                                <input type="text" name="fname" id="fname" className='form-control' autoComplete='fname' onChange={handleChange}/>
                            </div>
                            <div className='mb-3 text-start'>
                                <label htmlFor="lname" className='form-label'>Last Name:</label>
                                <input type="text" name="lname" id="lname" className='form-control' autoComplete='lname' onChange={handleChange}/>
                            </div>
                            <div className='mb-3 text-start'>
                                <label htmlFor="uname" className='form-label'>Username:</label>
                                <input type="text" name="uname" id="uname" className='form-control' autoComplete='username' onChange={handleChange} />
                            </div>
                            <div className='mb-3 text-start'>
                                <label htmlFor="email" className='form-label'>Email:</label>
                                <input type="email" name="email" id="email" className='form-control' autoComplete='email' onChange={handleChange}/>
                            </div>
                            <div className='mb-3 text-start'>
                                <label htmlFor="password" className='form-label'>Password:</label>
                                <input type="password" name="password" id="password" className='form-control' autoComplete='new-password' onChange={handleChange}/>
                            </div>
                            <div className='mb-3 text-start'>
                                <label htmlFor="cpassword" className='form-label'>Confirm Password:</label>
                                <input type="password" name="cpassword" id="cpassword" className='form-control' autoComplete='new-password' onChange={handleChange} />
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
