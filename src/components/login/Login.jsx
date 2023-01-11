import React from 'react'
import './Login.scss';
import LoginSvg from '../../assets/images/login.svg'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

// const DEFAULT_FORM_LOGIN={
//   username: '',
//   password: ''
// }

const Login = () => {
  const navigate = useNavigate();
const [email, setEmail]= useState()
const [password, setPassword] = useState()
  const [error, setError]= useState()
  const [login, setLogin]=useState([])


  


  const handleRedirection = async (e) => {
    e.preventDefault()

    const dataq = { email: email, password: password }
    try {
      if(email=== ""){
       return setError("PLease fill in your email")
      }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
        return setError("Invalid email!!!")
      }else if(password=== ""){
        return setError("please your password")
      }else{
        const res = await axios.post('http://localhost:4000/login', dataq)
        const token = res.data.token
        console.log(token)
        navigate("/form")
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className='container login'>
      <div className="row login_card">
        <div className="col-md-6">
          <img src={LoginSvg} alt="" />
        </div>
        <div className="col-md-6">
          <div className="text-center">
            <h2>Sign in</h2>
          </div>
          <form action="">
          {error && <p className="error_message">{error} </p> }
            <div className="form-group">
              <label className='form-label' htmlFor="">Email:</label>
              <input className='form-control'
              type="email" 
              placeholder='email' 
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className='form-label' htmlFor="">Password:</label>
              <input className='form-control' type="password"
              name= "password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
               placeholder='Password'
                />
            </div>
            <div className="form-group">
              <button className='btn btn-danger' onClick={handleRedirection}>Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login