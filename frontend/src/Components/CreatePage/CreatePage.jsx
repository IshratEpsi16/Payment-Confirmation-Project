import React from 'react';
import img from '../../../public/images/logo.png'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const CreatePage = () => {

    const [customer, setCustomer] = useState([])

    //  console.log('Customer array', customer)
    useEffect(() => {
        axios.get('http://localhost:8081/')
            .then(res => setCustomer(res.data))
            .catch(err => console.log(err)); // Use catch to handle errors
    }, [])
    return (
        <div>
            <nav className="navbar bg-body-tertiary">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img src={img} className='image' alt="Bootstrap" width="30" height="24" />
                    </a>


                    <div className='text-danger'>
                        <Link to='/home' className='text-danger'> <svg style={{ height: '35px', width: '35px' }} fill='currentcolor' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c.2 35.5-28.5 64.3-64 64.3H128.1c-35.3 0-64-28.7-64-64V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24zM352 224a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zm-96 96c-44.2 0-80 35.8-80 80c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16c0-44.2-35.8-80-80-80H256z" /></svg>
                        </Link>
                    </div>
                </div>
            </nav >
            <div className='container'>
                <h5>All Information</h5>
                <table className='table table-striped-columns"'>
                    <thead className='table-info '>
                        <tr>
                            <th>Payee ID</th>
                            <th>Payee Name</th>
                            <th>Cash Amount</th>
                            <th>Mail</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {console.log('cy', customer)}
                        {customer.map((item, i) => (
                            <tr key={i}>
                                <td>{item.PAYEE_ID}</td>

                                <td>{item[1]}</td>
                                <td>{item[2]}</td>
                                <td>{item[3]}</td>
                                <td>{item[4]}</td>
                                <td>{item[5]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CreatePage;