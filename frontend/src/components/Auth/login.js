import React, { useState }  from 'react';
import './auth.css';
import PropTypes from 'prop-types';

async function loginUser(credentials) {
    return fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }
   

export default function Login({ setToken }) {
    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          email,
          password
        });
        setToken(token);
      }

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  return(
    
    <div className="login-wrapper">
      <div className='form'>
      <h1>Please Log In</h1>
      <form  onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input className='form-input' type="text" onChange={e => setEmail(e.target.value)}/>
        </div>
        <div>
          <label>Password</label>
          <input className='form-input' type="password" onChange={e => setPassword(e.target.value)} />
        </div>
        <div>
          <button type="submit" className='form-btn'>Submit</button>
        </div>
      </form>
      </div>
    </div>
  )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }