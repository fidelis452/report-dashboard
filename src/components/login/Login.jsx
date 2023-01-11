import React, { useState } from 'react'
import './Login.scss';
import LoginSvg from '../../assets/images/login.svg'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: ""
  })
  const navigate = useNavigate();

  const handleRedirection = () => {
    navigate('/forms')
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
            <div className="form-group">
              <label className='form-label' htmlFor="">Username:</label>
              <input className='form-control' type="text" placeholder='username' value={data.username}/>
            </div>
            <div className="form-group">
              <label className='form-label' htmlFor="">Password:</label>
              <input className='form-control' type="password" placeholder='Password' value={data.password}/>
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