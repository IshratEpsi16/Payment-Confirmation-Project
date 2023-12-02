//import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './Components/Signup/Signup';
import Customer from './Customer';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';


function App() {

  return (
    <>

      <BrowserRouter>

        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/customer' element={<Customer />}></Route>

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
