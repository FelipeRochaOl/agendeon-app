import { createContext, ReactElement, useContext, useState } from "react";
import { API_URL } from "../config/Http";
import { AuthContext } from "./AuthContext";
import { User } from "./UserContext";

export interface Client {
  id: string
  name: string
  cpf?: string
  age?: number
  user: User
  createdAt: string[]
  deleted: boolean
}

export interface CreateClient {
  name: string
  cpf: string
  age: number
}

interface ClientContextType {
  clients: Client[];
  getClients: () => Promise<void>;
  createClient: (client: CreateClient) => Promise<Client | null>;
  updateClient: (clients: Client) => Promise<void>;
  deleteClient: (code: string) => Promise<void>;
}

export const ClientContext = createContext({} as ClientContextType);

interface ClientProviderProps {
  children: React.ReactNode;
}

export const ClientProvider = ({ children }: ClientProviderProps): ReactElement<ClientContextType> => {
  const { token } = useContext(AuthContext)
  const url = `${API_URL}/clients`
  const [clients, setClients] = useState<Client[]>([]);

  const getClients = async () => {
    const response = await fetch(`${url}/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    const { data } = await response.json()
    const clients: Client[] = data
    setClients(clients);
  };

  const createClient = async (client: CreateClient) => {
    try {
      const response = await fetch(`${url}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(client)
      })
      const { data } = await response.json()
      if (!data) throw new Error('Erro ao criar cliente')
      const clientNew: Client = data
      setClients([...clients, clientNew]);
      return clientNew
    } catch (error) {
      console.error(error)
      return null
    }
  };

  const updateClient = async (client: Client) => {
    const { id, ...data } = client
    await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(data)
    })
    setClients([...clients, client]);
  };

  const deleteClient = async (id: string) => {
    await fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    const result = clients.filter((client) => client.id !== id);
    setClients(result);
  };

  return (
    <ClientContext.Provider value={{ clients, getClients, createClient, updateClient, deleteClient }}>
      {children}
    </ClientContext.Provider>
  );
};