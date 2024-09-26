import { createContext, useContext, useState } from "react"
import { Toast } from "../components/Toast"
import { API_URL } from "../config/Http"
import { Service, ServiceRequest } from "../interfaces/Service"
import { AuthContext } from "./AuthContext"

interface ServiceContextType {
  services: Service[]
  openForm: boolean
  getServices: (companyId: string) => Promise<void>
  createService: (service: ServiceRequest) => Promise<void>
  updateService: (service: ServiceRequest) => Promise<void>
  deleteService: (id: string) => Promise<void>
  setOpenForm: (open: boolean) => void
}

export const ServiceContext = createContext({} as ServiceContextType)

interface ServiceProviderProps {
  children: React.ReactNode
}

export const ServiceProvider = ({ children }: ServiceProviderProps) => {
  const { token, logout } = useContext(AuthContext)
  const url = `${API_URL}/services`
  const [services, setService] = useState<Service[]>([])
  const [openForm, setOpenForm] = useState(false);

  const getServices = async (companyId: string) => {
    const response = await fetch(`${url}/${companyId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    const { data } = await response.json()
    if (response.status === 403) {
      await logout()
      return
    }
    if (!data.length) return
    const result: Service[] = data
    setService(result);
  }

  const createService = async (serviceNew: ServiceRequest) => {
    const response = await fetch(`${url}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(serviceNew)
    })
    if (response.status === 403) {
      await logout()
      return
    }
    Toast({ type: 'success', text: 'Serviço criado com sucesso' })
    await getServices(serviceNew.companyId)
  }

  const updateService = async (servicePut: ServiceRequest) => {
    const { code, ...data } = servicePut
    const response = await fetch(`${url}/${code}`, {
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
    Toast({ type: 'info', text: 'Serviço atualizado com sucesso' })
    await getServices(servicePut.companyId)
  }

  const deleteService = async (code: string) => {
    const response = await fetch(`${url}/${code}`, {
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
    const result = services.filter((data) => data.code !== code);
    Toast({ type: 'warning', text: 'Servico deletado com sucesso' })
    setService(result);
  }

  return (
    <ServiceContext.Provider value={{ services, openForm, getServices, createService, updateService, deleteService, setOpenForm }}>
      {children}
    </ServiceContext.Provider>
  )
}