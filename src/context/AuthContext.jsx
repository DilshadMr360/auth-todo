import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user data from localStorage on component mount
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem('user')); // Get user from localStorage
  
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      setUser(storedUser);
      return true; // Successful login
    } else {
      return false; // Invalid login
    }
  };

  const register = (name, email, password) => {
    const userId = Date.now(); // Generate a unique ID for the user
    const userData = { id: userId, name, email, password };
    localStorage.setItem('user', JSON.stringify(userData)); // Save user to localStorage
    setUser(userData); // Update state with the new user
  };

  const logout = () => {
  };
  
  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
