import { createContext, useContext, useState } from "react"
import { API_URL } from "../config/Http"
import { AuthContext } from "./AuthContext"

export interface Address {
  id?: string
  token?: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
  uf: string
  zip: string
  country: string
}

interface AddressContextType {
  address: Omit<Address, 'id'>
  addresses: Address[]
  getAddresses: () => void
  createAddress: (address: Address) => Promise<string | null>
  updateAddress: (address: Address) => void
  deleteAddress: (id: string) => void
  getAddressWithCEP: (cep: string) => void
}

export const AddressContext = createContext({} as AddressContextType)

interface AddressProviderProps {
  children: React.ReactNode
}

export const AddressProvider = ({ children }: AddressProviderProps) => {
  const { token, logout } = useContext(AuthContext)
  const url = `${API_URL}/addresses`
  const [addresses, setAddress] = useState<Address[]>([])
  const [address, setAddressCEP] = useState<Omit<Address, 'id'>>({} as Omit<Address, 'id'>)

  const getAddresses = async () => {
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
    const address: Address[] = data
    setAddress(address);
  }

  const createAddress = async (addressNew: Address) => {
    try {
      const getToken = token ?? addressNew.token
      const response = await fetch(`${url}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getToken
        },
        body: JSON.stringify(addressNew)
      })
      if (response.status === 403) {
        await logout()
        return null
      }
      const { data } = await response.json()
      if (!data) throw new Error('Erro ao criar endereço')
      const address: Address = data
      setAddress([...addresses, address]);
      return address.id as string
    } catch (error) {
      console.error(error)
      return null
    }
  }

  const updateAddress = async (addressPut: Address) => {
    const { id, ...data } = addressPut
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
    setAddress([...addresses, addressPut]);
  }

  const deleteAddress = async (id: string) => {
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
    const result = addresses.filter((data) => data.id !== id);
    setAddress(result);
  }

  const getAddressWithCEP = async (cep: string) => {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const data = await response.json()
    setAddressCEP({
      street: data.logradouro,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.estado,
      uf: data.uf,
      zip: data.cep,
      country: 'BR',
      number: '',
      complement: data.complemento
    })
  }

  return (
    <AddressContext.Provider value={{ address, addresses, getAddresses, createAddress, updateAddress, deleteAddress, getAddressWithCEP }}>
      {children}
    </AddressContext.Provider>
  )
}