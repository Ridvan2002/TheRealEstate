import React, { useState } from 'react';
import '../styles/Auth.css';
import { useAuth } from '../context/AuthContext';

function Auth({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      login(email, password, onClose); // Pass onClose to close modal on success
    } else {
      register(email, password, onClose); // Pass onClose to close modal on success
    }

    // Clear the form fields after submission
    setEmail('');
    setPassword('');
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);

    // Clear the form fields when toggling between login and register
    setEmail('');
    setPassword('');
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Welcome to YourApp</h2>
        <div className="auth-header">
          <button 
            onClick={handleToggle} 
            className={isLogin ? 'active' : ''}
          >
            Sign in
          </button>
          <button 
            onClick={handleToggle} 
            className={!isLogin ? 'active' : ''}
          >
            New account
          </button>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
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
