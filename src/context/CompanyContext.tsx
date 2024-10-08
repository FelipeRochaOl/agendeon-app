import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { Toast } from "../components/Toast"
import { API_URL } from "../config/Http"
import { Company, CreateCompany } from "../interfaces/Company"
import { AuthContext } from "./AuthContext"

interface CompanyContextType {
  company: Company;
  companies: Company[];
  setCompanies: React.Dispatch<React.SetStateAction<Company[]>>;
  getCompanies: () => void;
  getCompanyById: (id: string) => Promise<void>;
  getCompanyByUserId: () => Promise<void>;
  createCompany: (company: CreateCompany) => Promise<Company | null>;
  updateCompany: (company: Company) => Promise<void>;
  deleteCompany: (id: string) => Promise<void>;
}

export const CompanyContext = createContext({} as CompanyContextType)

interface CompanyProviderProps {
  children: React.ReactNode
}

export const CompanyProvider = ({ children }: CompanyProviderProps) => {
  const { token, isBusiness, logout } = useContext(AuthContext)
  const url = `${API_URL}/companies`
  const [company, setCompany] = useState<Company>({} as Company)
  const [companies, setCompanies] = useState<Company[]>([])

  const getCompanies = useCallback(async () => {
    const response = await fetch(`${url}/list`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const { data } = await response.json()
    if (!data) return
    const companies: Company[] = data
    setCompanies(companies);
  }, [url])

  const getCompanyById = async (id: string) => {
    const companyFind = companies.find((company) => company.id === id)
    if (companyFind) {
      setCompany(companyFind)
      return
    }
    const response = await fetch(`${url}/${id}`, {
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
    if (!data) return
    const company: Company = data
    setCompany(company);
  }

  const getCompanyByUserId = useCallback(async () => {
    const response = await fetch(`${url}/user`, {
      headers: {
        'Content-Type': 'application',
        'Authorization': 'Bearer ' + token
      }
    })
    if (response.status === 403) {
      await logout()
      return
    }
    const { data } = await response.json()
    if (!data) return
    const company: Company = data
    if (isBusiness) return
    setCompany(company);
  }, [token, url, isBusiness])

  useEffect(() => {
    getCompanyByUserId()
    getCompanies()
  }, [getCompanyByUserId, getCompanies])

  const createCompany = async (companyNew: CreateCompany) => {
    try {
      const getToken = token ?? companyNew.token
      const response = await fetch(`${url}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getToken
        },
        body: JSON.stringify(companyNew)
      })
      if (response.status === 403) {
        await logout()
        return null
      }
      const { data } = await response.json()
      if (!data) throw new Error('Erro ao criar empresa')
      const company: Company = data
      setCompanies([...companies, company]);
      Toast({ type: 'success', text: 'Empresa cadastrada com sucesso' })
      return company
    } catch (error) {
      console.error(error)
      Toast({ type: 'error', text: 'Erro ao criar empresa' })
      return null
    }
  }

  const updateCompany = async (companyPut: Company) => {
    const { id, ...data } = companyPut
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
    Toast({ type: 'info', text: 'Empresa atualizada com sucesso' })
    setCompanies([...companies, companyPut]);
  }

  const deleteCompany = async (id: string) => {
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
    const result = companies.filter((data) => data.id !== id);
    Toast({ type: 'error', text: 'Empresa deletada com sucesso' })
    setCompanies(result);
  }

  useEffect(() => {
    getCompanies()
  }, [getCompanies])

  return (
    <CompanyContext.Provider value={{
      company,
      companies,
      setCompanies,
      getCompanies,
      getCompanyByUserId,
      createCompany,
      updateCompany,
      deleteCompany,
      getCompanyById
    }}>
      {children}
    </CompanyContext.Provider>
  )
}