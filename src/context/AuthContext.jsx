import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (email, password) => {
    const users = Object.keys(localStorage)
      .filter(key => key.startsWith('user_'))
      .map(key => JSON.parse(localStorage.getItem(key)));
    
    const storedUser = users.find(user => user.email === email && user.password === password);
    
    if (storedUser) {
      setUser(storedUser);
      localStorage.setItem('currentUser', JSON.stringify(storedUser));
      return { success: true };
    } else {
      return { success: false, message: 'Invalid credentials' };
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
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
