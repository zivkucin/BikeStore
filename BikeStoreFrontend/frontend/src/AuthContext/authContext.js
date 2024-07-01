import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  });
  
  const updateAuthentication = (isAuthenticated) => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
    setAuthState({ isAuthenticated });
  };
  
    return (
      <AuthContext.Provider value={{ ...authState, setIsAuthenticated: updateAuthentication }}>
        {children}
      </AuthContext.Provider>
    );
  
};
   
