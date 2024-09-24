import { createContext, useContext, useState } from "react"
import { API_URL } from "../config/Http"
import { AuthContext } from "./AuthContext"

export interface Service {
  code: string
  description: string
  value: string
  duration: number
}

interface ServiceContextType {
  services: Service[]
  getServices: () => void
  createService: (service: Service) => void
  updateService: (service: Service) => void
  deleteService: (id: string) => void
}

export const ServiceContext = createContext({} as ServiceContextType)

interface ServiceProviderProps {
  children: React.ReactNode
}

export const ServiceProvider = ({ children }: ServiceProviderProps) => {
  const { token } = useContext(AuthContext)
  const url = `${API_URL}/services`
  const [services, setService] = useState<Service[]>([])

  const getServices = async () => {

    const response = await fetch(`${url}/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    const data: Service[] = await response.json()
    setService(data);
  }

  const createService = async (serviceNew: Service) => {
    await fetch(`${url}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(serviceNew)
    })
    setService([...services, serviceNew]);
  }

  const updateService = async (servicePut: Service) => {
    const { code, ...data } = servicePut
    await fetch(`${url}/${code}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(data)
    })
    setService([...services, servicePut]);
  }

  const deleteService = async (code: string) => {
    await fetch(`${url}/${code}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    const result = services.filter((data) => data.code !== code);
    setService(result);
  }

  return (
    <ServiceContext.Provider value={{ services, getServices, createService, updateService, deleteService }}>
      {children}
    </ServiceContext.Provider>
  )
}