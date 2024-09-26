import { createContext, ReactElement, useContext, useState } from "react";
import { Toast } from "../components/Toast";
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
  const { token, logout } = useContext(AuthContext)
  const url = `${API_URL}/clients`
  const [clients, setClients] = useState<Client[]>([]);

  const getClients = async () => {
    const response = await fetch(`${url}/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    if (response.status === 403) {
      await logout()
      return
    }
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
      if (response.status === 403) {
        await logout()
        return null
      }
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
    Toast({ type: 'info', text: 'Cliente atualizado com sucesso' })
    setClients([...clients, client]);
  };

  const deleteClient = async (id: string) => {
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
    const result = clients.filter((client) => client.id !== id);
    Toast({ type: 'warning', text: 'Cliente deletado com sucesso' })
    setClients(result);
  };

  return (
    <ClientContext.Provider value={{ clients, getClients, createClient, updateClient, deleteClient }}>
      {children}
    </ClientContext.Provider>
  );
};