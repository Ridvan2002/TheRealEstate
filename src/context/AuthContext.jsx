import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (email, password) => {
    console.log('Logging in with:', email, password);
    setIsLoggedIn(true);
  };

  const register = (email, password) => {
    console.log('Registering with:', email, password);
    setIsLoggedIn(true);
  };

  const logout = () => {
    console.log('Logging out...');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
