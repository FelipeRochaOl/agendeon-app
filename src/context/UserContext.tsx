import { createContext, useState } from "react";

export interface User {
  id: string
  email: string
  createdAt: string[]
}

export interface UserContextType {
  users: User[];
  getUser: () => Promise<void>;
  createUser: (user: User) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

export const UserContext = createContext({} as UserContextType);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [users, setUser] = useState<User[]>([]);

  const getUser = async () => {
    const auth = 'feliperochaoliveira@gmail.com:123456'
    const response = await fetch('http://localhost:8080/users/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(auth)
      }
    })
    const data: User[] = await response.json()
    setUser(data);
  };

  const createUser = async (user: User) => {
    const auth = 'feliperochaoliveira@gmail.com:123456'
    await fetch('http://localhost:8080/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(auth)
      },
      body: JSON.stringify(user)
    })
    setUser([...users, user]);
  };

  const updateUser = async (user: User) => {
    const auth = 'feliperochaoliveira@gmail.com:123456'
    const { id, ...data } = user
    await fetch(`http://localhost:8080/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(auth)
      },
      body: JSON.stringify(data)
    })
    setUser([...users, user]);
  };

  const deleteUser = async (id: string) => {
    const auth = 'feliperochaoliveira@gmail.com:123456'
    await fetch(`http://localhost:8080/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(auth)
      }
    })
    const result = users.filter((client) => client.id !== id);
    setUser(result);
  };

  return (
    <UserContext.Provider value={{ users, getUser, createUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};