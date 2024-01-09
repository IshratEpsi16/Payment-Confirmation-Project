import React, { useState } from 'react';
import img from '../../../public/images/logo.png'
import { Link } from 'react-router-dom';
import Home from '../Home/Home';
import './LoginStyle.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
//import Validation from './LoginValidation';
import 'bootstrap/dist/css/bootstrap.min.css';
const Login = () => {
    const [employeeId, setEmployeeId] = useState('')
    const [employeePassword, setEmployeePassword] = useState('')

    const [errors, setErrors] = useState({

    })
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/login', {
            employeeId,
            employeePassword

        })
            .then(res => {
                console.log("Server Response:", res);

                if (res.data || res.data.status === 'success') {
                    const role = res.data.role;
                    console.log('role', role)

                    if (role === 'admin') {
                        // Redirect to the admin page
                        navigate('/home');
                    } else if (role == null) {
                        // Redirect to the user page
                        navigate('/userhome');
                    } else {
                        console.error('Invalid role:', role);
                        alert('Invalid role');
                    }
                } else {
                    console.error('Login failed. Server response:', res.data);
                    alert('Invalid ID or password');
                }
            })
            .catch(err => {
                console.error("Error during POST request:", err);
                alert('Error during login. Please try again.');
            });
    };


    // const handleInput = (event) => {
    //     setvalues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))

    // }
    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>

            <div className='p-3 rounded w-25 border  loginForm'>
                <div className="mt-3 center-container">
                    <img src={img} className='img' alt="Description of the image" />
                </div>
                <h2 className='m-4 text-color text-center'>Login Form</h2>
                <form action='POST' onSubmit={handleSubmit}>
                    <div className="m-3 text-color1 ">
                        <label htmlFor="employeeID" className=" form-label">Employee ID</label>
                        <input type="text" value={employeeId} onChange={e => setEmployeeId(e.target.value)} className="form-control" id="employeeID" />


                    </div>
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                    <div className="m-3 text-color1">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input value={employeePassword} onChange={e => setEmployeePassword(e.target.value)} type="password" name='password' className="form-control" id="exampleInputPassword1" />
                    </div>
                    {errors.password && <span className='text-danger'>{errors.password}</span>}

                    <button className="m-3 button btn btn-primary" type="submit">Login</button><br></br>
                    <a href="#" className='m-3 forgot'>Forgot Password?</a>


                    <p className='m-3 sign'>Don't have any account?&nbsp;<Link to='/signup'>Sign Up</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;