import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api.service';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('');

  useEffect(() => {
    const storedDataUser = localStorage.getItem(global.config.LOCALSTORAGE_NAME);
    if (storedDataUser) {
      setUser(JSON.parse(storedDataUser));
    }
  }, [user]);
  function signOut() {
    setUser('');
    localStorage.removeItem(global.config.LOCALSTORAGE_NAME);
  }
  async function signIn(entity) {
    const response = await api.post('/user/login', entity);
    if(response.data.data){
      setUser(response.data.data);
      localStorage.setItem(
        global.config.LOCALSTORAGE_NAME,
        JSON.stringify(response.data.data)
      );
    }

    return response;
  }
  async function signUp(entity) {
    const response = await api.post('/user/signup', entity);
    return response;
  }
  return (
    <AuthContext.Provider
      value={{
        authenticated: Boolean(user),
        user,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }
  return context;
}

export default AuthContext;
