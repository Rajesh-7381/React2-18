import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './All.css';

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    document.title = 'Update';
    fetchData();
  }, []);

  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/updateData/${id}`);
      const { data } = response.data;
      setFname(data.fname);
      setLname(data.lname);
      setUname(data.uname);
      setEmail(data.email);
      setGender(data.gender);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("photo", photo);
      formData.append("fname", fname);
      formData.append("lname", lname);
      formData.append("uname", uname);
      formData.append("email", email);
      formData.append("gender", gender);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      
      const res = await axios.put(`http://localhost:8081/updateData/${id}`, formData, config);
      
      console.log("Data updated successfully:", res.data);
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to update data. Please try again later.');
    }
  };

  return (
    <div>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-lg-9 col-xl-7">
              <div className="card shadow-2-strong card-registration" style={{ borderRadius: "15px" }}>
                <div className="card-body p-4 md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Update Form</h3>
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="text-center">                
                      <img src="" alt="Uploaded" />                                     
                      <input
                        type="file"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        name="photo"
                      />
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="firstName">First Name</label>
                          <input
                            type="text"
                            id="firstName"
                            className="form-control form-control-lg"
                            name="fname"
                            value={fname}
                            onChange={(e) => setFname(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="lastname">Last Name</label>
                          <input
                            type="text"
                            id="lastname"
                            className="form-control form-control-lg"
                            name="lname"
                            value={lname}
                            onChange={(e) => setLname(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label htmlFor="username" className="form-label">Username</label>
                          <input
                            type="text"
                            id="username"
                            className="form-control form-control-lg"
                            name="uname"
                            value={uname}
                            onChange={(e) => setUname(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label htmlFor="username" className="form-label">Email</label>
                          <input
                            type="email"
                            id="email"
                            className="form-control form-control-lg"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <h6 className="mb-2 pb-1">Gender: </h6>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="femaleGender"
                            value="Female"
                            checked={gender === 'Female'}
                            onChange={(e) => setGender(e.target.value)}
                          />
                          <label className="form-check-label" htmlFor="femaleGender">Female</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="maleGender"
                            value="Male"
                            checked={gender === 'Male'}
                            onChange={(e) => setGender(e.target.value)}
                          />
                          <label className="form-check-label" htmlFor="maleGender">Male</label>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-2">
                      <button className="btn btn-primary btn-lg" type="submit">Update</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Update;
