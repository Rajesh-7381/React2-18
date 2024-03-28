import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import {CSVLink} from 'react-csv';
import './All.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [Data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');


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
    // delete data
    const deleteData = async (id) => {
        try {
            const confirmed = await Swal.fire({
                title: 'Are you sure?',
                text: 'You won\'t be able to revert this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
            });
    
            if (confirmed.isConfirmed) {
                const response = await axios.get(`http://localhost:8081/deletedata/${id}`);
                console.log(response.data);
                fetchData();
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your data has been deleted.',
                    icon: 'success'
                });
            }
        } catch (error) {
            console.error("Error deleting data:", error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to delete data. Please try again later.',
                icon: 'error'
            });
        }
    };

    // csv download
    const headers=[
        {label:'FName',key:'fname'},
        {label:'LName',key:'lname'},
        {label:'UName',key:'uname'},
        {label:'Email',key:'email'},
    ]
    
    // for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const recordPerPage = 5;
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const records = Data.slice(firstIndex, lastIndex);
    const npages = Math.ceil(Data.length / recordPerPage);
    const numbers = [...Array(npages+1).keys()].slice(1);


    const prePage = () => {
        if(currentPage !== firstIndex){
            setCurrentPage(currentPage-1);
        }
    };

    const nextPage = () => {
        if(currentPage !== lastIndex){
            setCurrentPage(currentPage+1);
        }
    };

    const pageChange = (page) => {
        setCurrentPage(page);
    };
    const filteredData = Data.filter((row) =>
    row.fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.lname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.uname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.email.toLowerCase().includes(searchQuery.toLowerCase())
);

    // modals shown
  const [modal, setModal] = useState(false);
    //   inside modal data shown
  const [modalData, setModalData] = useState({});
  const toggle = async(id) => {
    // alert(id);
    try {
        const response=await axios.get(`http://localhost:8081/getSingleData/${id}`);
        setModalData(response.data.data);
        setModal(!modal)
    } catch (error) {
        // console.error('Error fetching data:', error);
    }
    setModal(!modal);
  };

  const externalCloseBtn = (
    <button
      type="button"
      className="bi-eye"
      style={{ position: 'absolute', top: '15px', right: '15px' }}
      onClick={toggle}
    >
      &times;
    </button>
  );
//   edit functionality
const navigate=useNavigate();
const editdata = (row) => {
    navigate(`/update/${row.id}`, { state: { data: row } });
  }; //this is an optional state object that can be passed to the new location being navigated  to.  In this case, it includes a data property set to the row object. This allows you to pass data between routes using React Router's location state feature


    return (
        <div>
            <div className='topNav' id='topNav'>
                <Link to={'/ecom'} id='linktag'>Home</Link>
                <Link to={'/news'} id='linktag'>News</Link>
                <Link to={'/contact'} id='linktag'>Contact</Link>
                <Link to={'/about'} id='linktag'>About</Link>
                <Link to={'/tictactoe'} id='linktag'>TicTacToe</Link>
                <Link to={'/amazon'} id='linktag'>Amazon</Link>
                <Link id='logoutlink'>Logut</Link>
            </div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className="col-md-9">
                        <div>
                            <h4 className='textcenter' style={{borderLeft:"10px solid green ",textShadow:"2px 2px 4px #000000",color:"coral"}}>Table Data</h4>
                           <input type="search" onChange={(e)=>setSearchQuery(e.target.value)} placeholder='Search............'/>
                           <label htmlFor="search"><button className='btn btn-success'>Search</button></label>
                            <CSVLink data={Data} headers={headers} filename='Static_users.csv'> <button id='csvbtnright' className='btn btn-primary '>Export CSV</button> </CSVLink>
                                
                            <table className='table table-bordered border-primary table-striped table_section tablecss'>
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
                                        (searchQuery ? filteredData : records).map((row, index) => (
                                       // Data.map((row, index) => ( // it is also correct to show all data (for showning pagination we use  records instead of Data)
                                            <tr key={index}>
                                                <td>{row.id}</td>
                                                <td>{row.fname}</td>
                                                <td>{row.lname}</td>
                                                <td>{row.uname}</td>
                                                <td>{row.email}</td>
                                                <td>
                                                <button  className='btn  btn-sm btn-dark ' onClick={()=>toggle(row.id)}><i className='bi bi-eye'><Link ></Link></i></button>
                                                <button className='btn  btn-sm btn-success' onClick={()=>editdata(row)}><i className='bi bi-pencil'></i></button>
                                                <button onClick={()=>deleteData(row.id)} className='btn  btn-sm btn-danger'><i className='bi bi-trash'></i></button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                            
                            <nav>
                            <ul className='pagination'>
                                <li className='page-item'>
                                    <button onClick={prePage} className='page-link'>Prev</button>
                                </li>
                                {numbers.map((n, i) => (
                                    <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                        <button onClick={() => pageChange(n)} className='page-link'>{n}</button>
                                    </li>
                                ))}
                                <li className='page-item'>
                                    <button onClick={nextPage} className='page-link'>Next</button>
                                </li>
                            </ul>
                        </nav>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <p style={{writingMode:"vertical-rl"}}>sidebar</p>
                        <div id='animatedivid'>div</div>
                        <br />
                        <div id='animatedivid2'></div>
                        <br />
                        <div id='cssroundedcorners'>css rounded corners</div> 
                        <br />
                                               
                    </div>
                </div>
            </div>
            <div>
            <Modal isOpen={modal} toggle={toggle} external={externalCloseBtn}>
            <ModalHeader><h4>Hi <span style={{color:"red"}}>{modalData.fname}</span> below your Details</h4></ModalHeader>
            <ModalBody>
              <b>Look at the top right of the page/viewport!</b>
              <br />
                <p>ID: <span style={{color:"blue",fontWeight:"bold"}}>{modalData.id}</span></p>
                <p>First Name: <span style={{color:"blue",fontWeight:"bold"}}>{modalData.fname}</span></p>
                <p>Last Name: <span style={{color:"blue",fontWeight:"bold"}}>{modalData.lname}</span></p>
                <p>Username: <span style={{color:"blue",fontWeight:"bold"}}>{modalData.uname}</span></p>                
                <p>Email: <span style={{color:"blue",fontWeight:"bold"}}>{modalData.email}</span></p>
                <p>Gender: <span style={{color:"blue",fontWeight:"bold"}}>{modalData.gender}</span></p>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={toggle}>
                Ok
              </Button>{' '}
              <Button color="danger" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
            </div>
            
        </div>
    );
};

export default Dashboard;
