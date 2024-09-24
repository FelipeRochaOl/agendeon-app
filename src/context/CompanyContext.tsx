import { createContext, useContext, useState } from "react"
import { API_URL } from "../config/Http"
import { Address } from "./AddressContext"
import { AuthContext } from "./AuthContext"

export interface Company {
  id: string
  name: string
  companyName: string
  cnpj: string
  address: Address
}

export interface CreateCompany {
  tradeName: string
  companyName: string
  cnpj: string
  addressId: string
}

interface CompanyContextType {
  companies: Company[]
  getCompanies: () => void
  createCompany: (company: CreateCompany) => Promise<void>
  updateCompany: (company: Company) => Promise<void>
  deleteCompany: (id: string) => Promise<void>
}

export const CompanyContext = createContext({} as CompanyContextType)

interface CompanyProviderProps {
  children: React.ReactNode
}

export const CompanyProvider = ({ children }: CompanyProviderProps) => {
  const { token } = useContext(AuthContext)
  const url = `${API_URL}/companies`
  const [companies, setCompany] = useState<Company[]>([])

  const getCompanies = async () => {
    const response = await fetch(`${url}/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    const { data } = await response.json()
    const companies: Company[] = data
    setCompany(companies);
  }

  const createCompany = async (companyNew: CreateCompany) => {
    const response = await fetch(`${url}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(companyNew)
    })
    const { data } = await response.json()
    const company: Company = data
    setCompany([...companies, company]);
  }

  const updateCompany = async (companyPut: Company) => {
    const { id, ...data } = companyPut
    await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(data)
    })
    setCompany([...companies, companyPut]);
  }

  const deleteCompany = async (id: string) => {
    await fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
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