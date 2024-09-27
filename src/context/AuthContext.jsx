import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const login = (email, password, onClose) => {
    const user = registeredUsers.find(user => user.email === email && user.password === password);
    
    if (user) {
    //   console.log('Login successful!');
      alert('Successfully logged in!');
      setIsLoggedIn(true);
      onClose();
    } else {
    //   console.log('Invalid email or password');
      alert('Invalid email or password');
    }
  };

  const register = (email, password, onClose) => {
    const existingUser = registeredUsers.find(user => user.email === email);
    
    if (existingUser) {
    //   console.log('User already registered');
      alert('User already registered');
    } else {
      setRegisteredUsers([...registeredUsers, { email, password }]);
      setIsLoggedIn(true);  // Automatically log in after registration
      alert('Successfully registered!');
    //   console.log('Registration successful');
      onClose();
    }
  };

  const logout = () => {
    // console.log('Logging out...');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
