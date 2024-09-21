import { createContext, ReactElement, useState } from "react";
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

interface ClientContextType {
  clients: Client[];
  getClients: () => Promise<void>;
  createClient: (clients: Client) => Promise<void>;
  updateClient: (clients: Client) => Promise<void>;
  deleteClient: (code: string) => Promise<void>;
}

export const ClientContext = createContext({} as ClientContextType);

interface ClientProviderProps {
  children: React.ReactNode;
}

export const ClientProvider = ({ children }: ClientProviderProps): ReactElement<ClientContextType> => {
  const [clients, setClients] = useState<Client[]>([]);

  const getClients = async () => {
    const auth = 'feliperochaoliveira@gmail.com:123456'
    const response = await fetch('http://localhost:8080/clients/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(auth)
      }
    })
    const data: Client[] = await response.json()
    setClients(data);
  };

  const createClient = async (client: Client) => {
    const auth = 'feliperochaoliveira@gmail.com:123456'
    await fetch('http://localhost:8080/clients/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(auth)
      },
      body: JSON.stringify(client)
    })
    setClients([...clients, client]);
  };

  const updateClient = async (client: Client) => {
    const auth = 'feliperochaoliveira@gmail.com:123456'
    const { id, ...data } = client
    await fetch(`http://localhost:8080/clients/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(auth)
      },
      body: JSON.stringify(data)
    })
    setClients([...clients, client]);
  };

  const deleteClient = async (id: string) => {
    const auth = 'feliperochaoliveira@gmail.com:123456'
    await fetch(`http://localhost:8080/clients/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(auth)
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