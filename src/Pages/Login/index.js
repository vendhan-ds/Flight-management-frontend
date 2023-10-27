import './login.css';
import React from 'react';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Login</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        <select name="type" id="type">
          <option value="customer">Customer</option>
          <option value="provider">Provider</option>
        </select>
        <div className='input'>
          <img src={email_icon} alt=""/>
          <input type='email' placeholder='Email ID'/>
        </div>
        <div className='input'>
          <img src={password_icon} alt=""/>
          <input type='password' placeholder='Password'/>
        </div>
        {/* <div className='forgotPassword'>Forgot Password? <span>Click Here</span></div> */}
        <div className='forgotPassword'>New User? <span onClick={() => {navigate('/Register')}}>Click Here</span></div>
        <div className='submitcontainer'>
          <div className="submit">Login</div>
        </div>
      </div>
    </div>
  );
}

export default Login;