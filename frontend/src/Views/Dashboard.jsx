import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './All.css';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [Data, setData] = useState([]);

    useEffect(() => {
        document.title = "Dashboard";
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8081/alldata');
            setData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };
    const deleteData=async(id)=>{
      try{
        const response=await axios.get(`http://localhost:8081/deletedata/${id}`);
        console.log(response.data);

      }catch(error){
        console.error("error to fetch",error);
      }
    }

    return (
        <div>
            <div className='topNav' id='topNav'>
                <Link to={'/home'} id='linktag'>Home</Link>
                <Link to={'/news'} id='linktag'>News</Link>
                <Link to={'/contact'} id='linktag'>Contact</Link>
                <Link to={'/about'} id='linktag'>About</Link>
                <Link to={'/tictactoe'} id='linktag'>TicTacToe</Link>
                <Link id='logoutlink'>Logut</Link>
            </div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className="col-md-9">
                        <div>
                            <h4 className='textcenter'>Table Data</h4>
                            <table className='table table-bordered border-primary table-striped'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="6" className="text-center">Loading...</td>
                                        </tr>
                                    ) : (
                                        Data.map((row, index) => (
                                            <tr key={index}>
                                                <td>{row.id}</td>
                                                <td>{row.fname}</td>
                                                <td>{row.lname}</td>
                                                <td>{row.uname}</td>
                                                <td>{row.email}</td>
                                                <td>
                                                <button  className='btn  btn-sm btn-dark '><i className='bi bi-eye'><Link to={row.id}></Link></i></button>
                                                <button className='btn  btn-sm btn-success'><i className='bi bi-pencil'></i></button>
                                                <button onClick={()=>deleteData(row.id)} className='btn  btn-sm btn-danger'><i className='bi bi-trash'></i></button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-md-3">Additional Column</div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
