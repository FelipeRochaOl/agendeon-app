import { createContext, useState } from "react"

export interface Address {
  id: string
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
  createAddress: (address: Address) => void
  updateAddress: (address: Address) => void
  deleteAddress: (id: string) => void
  getAddressWithCEP: (cep: string) => void
}

export const AddressContext = createContext({} as AddressContextType)

interface AddressProviderProps {
  children: React.ReactNode
}

export const AddressProvider = ({ children }: AddressProviderProps) => {
  const [addresses, setAddress] = useState<Address[]>([])
  const [address, setAddressCEP] = useState<Omit<Address, 'id'>>({} as Omit<Address, 'id'>)

  const getAddresses = async () => {
    const auth = 'feliperochaoliveira@gmail.com:123456'
    const response = await fetch('http://localhost:8080/address/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(auth)
      }
    })
    const data: Address[] = await response.json()
    setAddress(data);
  }

  const createAddress = async (addressNew: Address) => {
    const auth = 'feliperochaoliveira@gmail.com:123456'
    await fetch('http://localhost:8080/address/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(auth)
      },
      body: JSON.stringify(addressNew)
    })
    setAddress([...addresses, addressNew]);
  }

  const updateAddress = async (addressPut: Address) => {
    const auth = 'feliperochaoliveira@gmail.com:123456'
    const { id, ...data } = addressPut
    await fetch(`http://localhost:8080/address/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(auth)
      },
      body: JSON.stringify(data)
    })
    setAddress([...addresses, addressPut]);
  }

  const deleteAddress = async (id: string) => {
    const auth = 'feliperochaoliveira@gmail.com:123456'
    await fetch(`http://localhost:8080/address/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(auth)
      }
    })
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
      state: data.uf,
      uf: data.uf,
      zip: data.cep,
      country: 'Brasil',
      number: '',
      complement: ''
    })
  }

  return (
    <AddressContext.Provider value={{ address, addresses, getAddresses, createAddress, updateAddress, deleteAddress, getAddressWithCEP }}>
      {children}
    </AddressContext.Provider>
  )
}