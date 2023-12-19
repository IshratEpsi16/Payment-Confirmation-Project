import React from 'react';
import img from '../../../../public/images/logo.png'
import profile from '../../../../public/images/default-profile.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './User_Homepage.css'
const User_Homepage = () => {
    return (
        <div>
            <nav className="navbar bg-body-tertiary">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img src={img} className='image' alt="Bootstrap" width="30" height="24" />
                    </a>

                    <div className='nav'>

                        <Link to='/create' style={{ textDecoration: 'none' }}>User Dashboard</Link>&nbsp;&nbsp;&nbsp;&nbsp;

                    </div>
                    <div className='text-danger' >

                        <svg fill='currentcolor' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" /></svg>
                        &nbsp; &nbsp;<button className='btn btn-outline-danger'>Logout</button>
                    </div>
                </div>
            </nav >
            <div className='container'>

                <div className='row'>


                    <div className='col-11'>

                        <div className='search'>
                            <form className="d-flex" role="search">
                                <input style={{ width: '30%' }} className="form-control me-2" type="search" placeholder="Period" aria-label="Search" />
                                <button className="btn btn-outline-primary" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                    <div className='col-1'>
                        <div className='right' style={{ height: '638px', width: '197px' }}>
                            <img src={profile} className='icon' alt="Bootstrap" width="30" height="24" />
                            <div className='text-light p-3 fw-bold'>
                                <p>ID :</p>
                                <p>Name :</p>
                                <p>Phone:</p>
                                <p>Mail :</p>
                            </div>
                        </div>




                    </div>
                </div>

            </div>
        </div >
    );
};

export default User_Homepage;