import { createContext, useState } from "react"
import { Address } from "./AddressContext"

export interface Company {
  id: string
  companyName: string
  cnpj: string
  address: Address
}

interface CompanyContextType {
  companies: Company[]
  getCompanies: () => void
  createCompany: (company: Company) => void
  updateCompany: (company: Company) => void
  deleteCompany: (id: string) => void
}

export const CompanyContext = createContext({} as CompanyContextType)

interface CompanyProviderProps {
  children: React.ReactNode
}

export const CompanyProvider = ({ children }: CompanyProviderProps) => {
  const [companies, setCompany] = useState<Company[]>([])

  const getCompanies = async () => {
    const auth = 'feliperochaoliveira@gmail.com:123456'
    const response = await fetch('http://localhost:8080/companies/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(auth)
      }
    })
    const data: Company[] = await response.json()
    setCompany(data);
  }

  const createCompany = async (companyNew: Company) => {
    const auth = 'feliperochaoliveira@gmail.com:123456'
    await fetch('http://localhost:8080/companies/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(auth)
      },
      body: JSON.stringify(companyNew)
    })
    setCompany([...companies, companyNew]);
  }

  const updateCompany = async (companyPut: Company) => {
    const auth = 'feliperochaoliveira@gmail.com:123456'
    const { id, ...data } = companyPut
    await fetch(`http://localhost:8080/companies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(auth)
      },
      body: JSON.stringify(data)
    })
    setCompany([...companies, companyPut]);
  }

  const deleteCompany = async (id: string) => {
    const auth = 'feliperochaoliveira@gmail.com:123456'
    await fetch(`http://localhost:8080/companies/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(auth)
      }
    })
    const result = companies.filter((data) => data.id !== id);
    setCompany(result);
  }

  return (
    <CompanyContext.Provider value={{ companies, getCompanies, createCompany, updateCompany, deleteCompany }}>
      {children}
    </CompanyContext.Provider>
  )
}