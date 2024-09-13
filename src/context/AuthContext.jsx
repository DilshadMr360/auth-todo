import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user data from localStorage on component mount
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (email, password) => {
    // Find user by email
    const users = Object.keys(localStorage)
      .filter(key => key.startsWith('user_'))
      .map(key => JSON.parse(localStorage.getItem(key)));
    
    const storedUser = users.find(user => user.email === email && user.password === password);
    
    if (storedUser) {
      setUser(storedUser);
      localStorage.setItem('currentUser', JSON.stringify(storedUser)); // Set current user
      return true; // Successful login
    } else {
      return false; // Invalid login
    }
  };

  const register = (name, email, password) => {
    const userId = Date.now(); // Generate a unique ID for the user
    const userData = { id: userId, name, email, password };
    localStorage.setItem(`user_${userId}`, JSON.stringify(userData)); // Save user with unique key
    localStorage.setItem('currentUser', JSON.stringify(userData)); // Set current user
    setUser(userData); // Update state with the new user
  };

  const logout = () => {
    localStorage.removeItem('currentUser'); // Remove current user from localStorage
    setUser(null); // Clear user state
  };
  
  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
