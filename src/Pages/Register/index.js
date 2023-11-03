// import './register.css';
import React from 'react';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Register</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        <select name="type" id="type">
          <option value="customer">Customer</option>
          <option value="provider">Provider</option>
        </select>
        <div className='input'>
          <img src={user_icon} alt=""/>
          <input type='text' placeholder='Name'/>
        </div>
        <div className='input'>
          <img src={email_icon} alt=""/>
          <input type='email' placeholder='Email ID'/>
        </div>
        <div className='input'>
          <img src={password_icon} alt=""/>
          <input type='password' placeholder='Password'/>
        </div>
        <div className='forgotPassword'>Have an account? <span onClick={() => {navigate('/')}}>Click Here</span></div>
        <div className='submitcontainer'>
          <div className="submit">Sign Up</div>
        </div>
      </div>
    </div>
  );
}

export default Register;