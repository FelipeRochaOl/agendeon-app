import { createContext, useContext } from "react"
import { Toast } from "../components/Toast"
import { API_URL } from "../config/Http"
import { Company, FilterCompany } from "../interfaces/Company"
import { AuthContext } from "./AuthContext"
import { CompanyContext } from "./CompanyContext"

interface FilterContextType {
  filterCompanyByAddress: (filter: FilterCompany) => Promise<void>;
  filterCompanyBySection: (sectionId: string) => Promise<void>;
  filterCompanyByCategory: (sectionId: string, categoryId: string) => Promise<void>;
}

interface FilterProviderProps {
  children: React.ReactNode
}

export const FilterContext = createContext({} as FilterContextType)

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const { token, logout } = useContext(AuthContext)
  const url = `${API_URL}/companies`
  const { companies, setCompanies } = useContext(CompanyContext)

  const filterCompanyByAddress = async (filter: FilterCompany) => {
    try {
      const response = await fetch(`${url}/filter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(filter)
      })
      if (response.status === 403) {
        await logout()
        return
      }
      const { data } = await response.json()
      if (!data) throw new Error('Erro ao buscar empresa')
      const companies: Company[] = data
      Toast({ type: 'success', text: 'Empresa encontrada com sucesso' })
      setCompanies(companies);
    } catch (error) {
      console.error(error)
      Toast({ type: 'info', text: 'Nenhuma empresa foi encontrada' })
    }
  }

  const filterCompanyBySection = async (sectionId: string) => {
    try {
      const response = await fetch(`${url}/${sectionId}`, {
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
      if (!data) throw new Error('Erro ao buscar empresa')
      const company: Company = data
      Toast({ type: 'success', text: 'Empresa encontrada com sucesso' })
      setCompanies([...companies, company]);
    } catch (error) {
      console.error(error)
      Toast({ type: 'info', text: 'Nenhuma empresa foi encontrada' })
    }
  }

  const filterCompanyByCategory = async (sectionId: string, categoryId: string) => {
    try {
      const response = await fetch(`${url}/${sectionId}/${categoryId}`, {
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
      if (!data) throw new Error('Erro ao buscar empresa')
      const company: Company = data
      Toast({ type: 'success', text: 'Empresa encontrada com sucesso' })
      setCompanies([...companies, company]);
    } catch (error) {
      console.error(error)
      Toast({ type: 'info', text: 'Nenhuma empresa foi encontrada' })
    }
  }

  return (
    <FilterContext.Provider value={{ filterCompanyByAddress, filterCompanyBySection, filterCompanyByCategory }}>
      {children}
    </FilterContext.Provider>
  )
}