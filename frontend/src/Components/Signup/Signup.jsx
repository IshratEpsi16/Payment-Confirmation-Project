import { useState } from 'react';
import axios from 'axios'
import img from '../../../public/images/logo.png'
//import Validation from './SignUpValidation';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './SignUpStyle.css'
const SignUp = () => {
    const [employeeId, setEmployeeId] = useState('')
    const [employeeName, setEmployeeName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [employeePassword, setEmployeePassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // const [values, setvalues] = useState({

    //     employeeId: '',
    //     employeeName: '',
    //     phoneNumber: '',
    //     email: '',
    //     employeePassword: '',
    //     confirmPassword: ''
    // })
    const navigate = useNavigate();
    const [errors, setErrors] = useState({

    })
    const handleSubmit = async (event) => {
        event.preventDefault();
        // setErrors(Validation(values));

        // if (
        //     errors.employeeId === "" &&
        //     errors.employeeName === "" &&
        //     errors.phoneNumber === "" &&
        //     errors.email === "" &&
        //     errors.employeePassword === "" &&
        //     errors.confirmPassword === ""
        // ) {
        //     try {
        //         const res = await axios.post('http://localhost:8081/signup', values);
        //         console.log(res.data);
        //         // Handle success (if needed)
        //     } catch (err) {
        //         console.error(err);
        //         // Handle error (if needed)
        //     }
        // }
        axios.post('http://localhost:8081/signup', {
            employeeId,
            employeeName,
            phoneNumber,
            email,
            employeePassword,
            confirmPassword
        })
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => {
                console.error("Error during POST request:", err);
            });
    };


    // const handleInput = (event) => {
    //     setvalues((prev) => ({ ...prev, [event.target.name]: event.target.value }))

    // }
    return (
        <div className='d-flex justify-content-center align-items-center signupPage' >
            <div className='signupForm'>
                <div className=" mt-4 center-container">
                    <img src={img} className='img' alt="Description of the image" />
                </div>
                <h2 className='m-2 text-color text-center'>Sign Up Here</h2>


                <form action='' onSubmit={handleSubmit}>
                    <div className="m-3 text-color1">
                        <label htmlFor="employeeID" className="form-label">Employee ID</label>
                        <input type="text" onChange={e => setEmployeeId(e.target.value)} className="form-control" id="employeeID" />

                    </div>
                    <div className="m-3 text-color1">
                        <label htmlFor="employeeName" className="form-label">Employee Name</label>
                        <input type="text" onChange={e => setEmployeeName(e.target.value)} className="form-control" id="employeeName" />

                        {errors.employeeName && <span className='text-danger'>{errors.employeeName}</span>}
                    </div>
                    <div className="m-3 text-color1">
                        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                        <input type="number" onChange={e => setPhoneNumber(e.target.value)} className="form-control" id="phoneNumber" />


                    </div>
                    <div className="m-3 text-color1">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input onChange={e => setEmail(e.target.value)} type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                    </div>
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                    <div className="m-3 text-color1">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input onChange={e => setEmployeePassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    {errors.employeePassword && <span className='text-danger'>{errors.employeePassword}</span>}
                    <div className="m-3 text-color1">
                        <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
                        <input onChange={e => setConfirmPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword2" />
                    </div>
                    <button type="submit" className="m-3 button btn btn-primary">Sign Up</button>
                    <p className='m-3 sign'>Already have an account?&nbsp;<Link to='/'>Log in</Link></p>

                </form>

            </div>
        </div>
    );
};

export default SignUp;