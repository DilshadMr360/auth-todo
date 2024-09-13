import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(); 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = Object.keys(localStorage)
      .filter(key => key.startsWith('user_'))
      .map(key => JSON.parse(localStorage.getItem(key)));
  
    // Find the user with matching email and password
    const storedUser = users.find(user => user.email === email && user.password === password);
  
    if (storedUser) {
      localStorage.setItem('currentUser', JSON.stringify(storedUser));
      setUser(storedUser);
      return true; // Login successful
    } else {
      return false; // Invalid credentials
    }
  };
  

  const register = (name, email, password) => {
    const users = Object.keys(localStorage)
      .filter(key => key.startsWith('user_'))
      .map(key => JSON.parse(localStorage.getItem(key)));

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
      return { success: false, message: 'User already exists' };
    } else {
      const userId = Date.now();
      const userData = { id: userId, name, email, password };
      localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
      localStorage.setItem('currentUser', JSON.stringify(userData));
      setUser(userData);
      localStorage.setItem(`todos_${userId}`, JSON.stringify([]));
      return { success: true };
    }
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
