import { createContext, useContext, useState } from "react";
import { Toast } from "../components/Toast";
import { API_URL } from "../config/Http";
import { AuthContext } from "./AuthContext";

export interface User {
  id: string
  email: string
  createdAt: string[]
}

export interface CreateUser {
  email: string
  password: string
}

export interface UserContextType {
  users: User[];
  getUser: () => Promise<void>;
  createUser: (user: CreateUser) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

export const UserContext = createContext({} as UserContextType);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const { token, logout } = useContext(AuthContext)
  const url = `${API_URL}/users`
  const [users, setUser] = useState<User[]>([]);

  const getUser = async () => {
    if (!token) return
    const response = await fetch(`${url}/profile`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    const data: User[] = await response.json()
    setUser(data);
  };

  const createUser = async (user: CreateUser) => {
    const response = await fetch(`${url}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(user)
    })
    if (response.status === 403) {
      await logout()
      return
    }
    Toast({ type: 'success', text: 'Usuário criado com sucesso' })
    getUser()
  };

  const updateUser = async (user: User) => {
    const { id, ...data } = user
    const response = await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(data)
    })
    if (response.status === 403) {
      await logout()
      return
    }
    Toast({ type: 'info', text: 'Usuário atualizado com sucesso' })
    setUser([...users, user]);
  };

  const deleteUser = async (id: string) => {
    const response = await fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    if (response.status === 403) {
      await logout()
      return
    }
    const result = users.filter((client) => client.id !== id);
    Toast({ type: 'warning', text: 'Usuário deletado com sucesso' })
    setUser(result);
  };

  return (
    <UserContext.Provider value={{ users, getUser, createUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};