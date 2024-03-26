import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './All.css';

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    uname: "",
    email: "",
    gender: "",
    image: null
  });

  useEffect(() => {
    document.title = 'Update';
    fetchData();
  });//useffect pass 2 parameter i,e function and  array (optional) if we pass array it means one time uploaded if we pass empty array or array it updates every time when component rerendering
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/updateData/${id}`);
      const { data } = response.data;
      setFormData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({ ...formData, [name]: type === 'file' ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      await axios.put(`http://localhost:8081/updateData/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to update data. Please try again later.');
    }
  };

  return (
    <div>
      <section className="vh-100 gradient-custom" >
        <div className="container py-5 h-100" >
          <div className="row justify-content-center align-items-center h-100" >
            <div className="col-lg-12 col-lg-9 col-xl-7" >
              <div className="card shadow-2-strong card-registration" style={{ borderRadius: "15px" }}>
                <div className="card-body p-4 md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Update Form</h3>
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    {/* Display any error messages */}
                    {error && <div className="alert alert-danger">{error}</div>}
                    {/* Form fields for updating data */}
                    <div className="text-center">
                      {/* Display the image if image URL is available */}
                      {formData.image && (
                        <img src={URL.createObjectURL(formData.image)} style={{ borderRadius: "50%" }} alt="Profile" id="imageheightwidth"/>
                      )}
                      <input
                        type="file"
                        onChange={handleChange}
                        name="image"
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
                            value={formData.fname}
                            onChange={handleChange}
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
                            value={formData.lname}
                            onChange={handleChange}
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
                            value={formData.uname}
                            onChange={handleChange}
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
                            checked={formData.gender === 'Female'}
                            onChange={handleChange}
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
                            checked={formData.gender === 'Male'}
                            onChange={handleChange}
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
