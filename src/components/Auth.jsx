import React, { useState } from 'react';
import '../styles/Auth.css';
import { useAuth } from '../context/AuthContext';

function Auth({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { login, register } = useAuth();

  const isProduction = process.env.NODE_ENV === 'production';
  const basePath = isProduction ? '/TheRealEstate' : '';

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      login(email, password, onClose);
    } else {
      register(email, password, firstName, lastName, onClose);
    }
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="auth-title">
          <div className="welcome-row">
            <span className="welcome-text">Welcome To</span>
          </div>
          <div className="title-row">
            <img src={`${basePath}/house.png`} alt="house icon" className="title-icon" />
            <h2 className="title-text">TheRealEstate</h2>
          </div>
        </div>

        <div className="auth-header">
          <button onClick={handleToggle} className={isLogin ? 'active' : ''}>Sign in</button>
          <button onClick={handleToggle} className={!isLogin ? 'active' : ''}>New account</button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Only show First Name and Last Name if REGISTERING */}
          {!isLogin && (
            <>
              <label>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
                required
              />
              <label>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
                required
              />
            </>
          )}
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
          <button type="submit" className="auth-submit">
            {isLogin ? 'Sign in' : 'Register'}
          </button>
        </form>

        {isLogin && (
          <div className="forgot-password">
            <a href="#">Forgot your password?</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Auth;