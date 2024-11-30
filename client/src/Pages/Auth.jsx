import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HiUserCircle } from 'react-icons/hi';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { loginUser, registerUser } from '../Redux/authSlice';
import '../Styles/Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, successMessage } = useSelector((state) => state.auth);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '', dob: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(loginUser({ email: formData.email, password: formData.password }))
        .unwrap()
        .then(() => {
          alert('Login successful!');
          console.log('Token:', localStorage.getItem('token')); 
          navigate('/table');
        })
        .catch((err) => console.error(err));
    } else {
      dispatch(registerUser(formData))
        .unwrap()
        .then(() => {
          alert('Registration successful!');
          toggleForm();
        })
        .catch((err) => console.error(err));
    }
  };
  
  return (
    <div className="auth-container">
      <div className="heading">
        <h1>{isLogin ? 'SIGN IN' : 'SIGN UP'}</h1>
      </div>
      <div className="user-icon">
        <HiUserCircle className="icon" />
      </div>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <div className="input-box">
              <FaUser />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required={!isLogin}
              />
            </div>
            <div className="input-box">
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required={!isLogin}
              />
            </div>
          </>
        )}
        <div className="input-box">
          <FaEnvelope />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="input-box">
          <FaLock />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <p>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span onClick={toggleForm} className="toggle-form">
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : isLogin ? 'LOGIN' : 'SIGN UP'}
        </button>
      </form>
    </div>
  );
};

export default Auth;
