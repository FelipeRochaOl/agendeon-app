import { Address } from "../context/AddressContext";
import { User } from "../context/UserContext";
import { Category } from "./Category";

export interface Company {
  id: string;
  name: string;
  companyName: string;
  cnpj: string;
  address: Address;
  category: Category;
  user: User;
}

export interface CreateCompany {
  tradeName: string;
  companyName: string;
  cnpj: string;
  addressId: string;
  categoryId: string;
  sessionId: string;
  token?: string;
}

export interface FilterCompany {
  zip: string;
  city: string;
  neighborhood: string;
}
