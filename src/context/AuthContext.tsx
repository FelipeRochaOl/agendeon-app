import { createContext, useCallback, useEffect, useState } from "react";
import { Toast } from "../components/Toast";
import { API_URL } from "../config/Http";


export interface Auth {
  username: string;
  token: string;
  expiresIn: number;
  isBusiness: boolean;
}

export interface AuthRequest {
  email: string;
  password: string;
  isBusiness?: boolean;
}

export interface AuthContextType {
  isBusiness: boolean;
  token: string | null;
  username: string
  expirationToken: number;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  login: (data: AuthRequest) => Promise<Auth | null>;
  signUp: (data: AuthRequest) => Promise<Auth | null>;
  setLogin: (data: Auth) => void;
  logout: () => Promise<boolean>;
  checkAuth: () => void;
}

export const AuthContext = createContext({} as AuthContextType);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [isBusiness, setIsBusiness] = useState(false);
  const [expirationToken, setExpirationToken] = useState(0);

  const login = async ({ email, password }: AuthRequest) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      const { data } = await response.json()
      if (!response.ok) throw new Error('Usuário ou senha inválidos')
      const result: Auth = data
      if (result.token && result.username && result.expiresIn) {
        setLogin(result)
        return result
      }
      throw new Error('Usuário ou senha inválidos')
    } catch (error) {
      console.error(error)
      Toast({ type: 'error', text: 'Usuário ou senha inválidos' })
      return null
    }
  }

  const signUp = async ({ email, password, isBusiness }: AuthRequest) => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, isBusiness })
      })
      const { data } = await response.json()
      if (!data) throw new Error('Erro ao criar usuário')
      const result: Auth = data
      return result
    } catch (error) {
      console.error(error)
      return null
    }
  }

  const setLogin = ({ token, expiresIn, username, isBusiness }: Auth) => {
    setToken(token);
    setUsername(username);
    setExpirationToken(expiresIn);
    setIsAuthenticated(true);
    setIsBusiness(isBusiness);
    localStorage.setItem('token-agendeon', token);
    localStorage.setItem('username-agendeon', username);
    localStorage.setItem('expirationIn-agendeon', expiresIn.toString());
    Toast({ type: 'success', text: 'Login efetuado com sucesso' })
  }

  const resetLogin = () => {
    setUsername('');
    setToken(null);
    setIsAuthenticated(false);
    setUsername('');
    setIsBusiness(false);
    localStorage.removeItem('token-agendeon');
    localStorage.removeItem('username-agendeon');
    localStorage.removeItem('expirationIn-agendeon');
    Toast({ type: 'info', text: 'Até mais :D' })
  }

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('token-agendeon');
    const username = localStorage.getItem('username-agendeon');
    const expirationIn = localStorage.getItem('expirationIn-agendeon');

    try {
      if (isAuthenticated && (!expirationIn || parseInt(expirationIn) <= Date.now())) {
        await logout()
        return;
      }
      if (token && username && expirationIn) {
        setToken(token);
        setUsername(username);
        setExpirationToken(Number(expirationIn));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error(error)
      resetLogin()
    }
  }, [])

  const logout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
      resetLogin()
      return true
    } catch (error) {
      console.error(error)
      Toast({ type: 'error', text: 'Ocorreu um erro ao sair do sistema' })
      return false
    }
  }

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <AuthContext.Provider value={{
      isBusiness,
      username,
      token,
      expirationToken,
      isAuthenticated,
      login,
      signUp,
      logout,
      setIsAuthenticated,
      checkAuth,
      setLogin
    }}>
      {children}
    </AuthContext.Provider>
  );
}