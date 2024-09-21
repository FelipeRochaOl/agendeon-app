import { createContext, useState } from "react"

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
  const [services, setService] = useState<Service[]>([])

  const getServices = async () => {
    const auth = 'feliperochaoliveira@gmail.com:123456'
    const response = await fetch('http://localhost:8080/services/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(auth)
      }
    })
    const data: Service[] = await response.json()
    setService(data);
  }

  const createService = async (serviceNew: Service) => {
    const auth = 'feliperochaoliveira@gmail.com:123456'
    await fetch('http://localhost:8080/services/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(auth)
      },
      body: JSON.stringify(serviceNew)
    })
    setService([...services, serviceNew]);
  }

  const updateService = async (servicePut: Service) => {
    const auth = 'feliperochaoliveira@gmail.com:123456'
    const { code, ...data } = servicePut
    await fetch(`http://localhost:8080/services/${code}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(auth)
      },
      body: JSON.stringify(data)
    })
    setService([...services, servicePut]);
  }

  const deleteService = async (code: string) => {
    const auth = 'feliperochaoliveira@gmail.com:123456'
    await fetch(`http://localhost:8080/services/${code}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(auth)
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