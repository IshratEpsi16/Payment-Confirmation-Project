import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateCustomer from './CreateCustomer';
import UpdateCustomer from './UpdateCustomer';

import Customer from './Customer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Customer />}>


          </Route>
          <Route path='/create' element={<CreateCustomer />}></Route>
          <Route path='/update/:id' element={<UpdateCustomer />}></Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
