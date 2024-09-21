import { createContext, useState } from "react";

export interface Auth {
  id: string;
  username: string;
  token: string;
}

export interface AuthContextType {
  token: string | null;
  name: string
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextType);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState('');

  const login = async (email: string, password: string) => {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    const data: Auth = await response.json()
    if (data.token && data.username) {
      setToken(data.token);
      setName(data.username);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }

  const logout = () => {
    setName('');
    setToken(null);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ name, token, isAuthenticated, login, logout, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}