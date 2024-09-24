import { createContext, useState } from "react";
import { Toast } from "../components/Toast";
import { API_URL } from "../config/Http";


export interface Auth {
  username: string;
  token: string;
  expiresIn: number;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthContextType {
  token: string | null;
  username: string
  expirationToken: number;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  login: (data: AuthRequest) => Promise<Auth | null>;
  signUp: (data: AuthRequest) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [expirationToken, setExpirationToken] = useState(0);

  const login = async ({ email, password }: AuthRequest) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    const { data } = await response.json()
    if (!response.ok) {
      Toast({ type: 'error', text: 'Usuário ou senha inválidos' })
      return null
    }
    const result: Auth = data
    if (result.token && result.username) {
      setToken(data.token);
      setUsername(data.username);
      setExpirationToken(data.expirationIn);
      setIsAuthenticated(true);
      Toast({ type: 'success', text: 'Login efetuado com sucesso' })
      return result
    }
    Toast({ type: 'error', text: 'Usuário ou senha inválidos' })
    return null
  }

  const signUp = async ({ email, password }: AuthRequest) => {
    await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
  }

  const logout = async () => {
    await fetch(`${API_URL}/auth/logout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    setUsername('');
    setToken(null);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ username, token, expirationToken, isAuthenticated, login, signUp, logout, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}