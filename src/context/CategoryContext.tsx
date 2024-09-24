import { createContext, ReactElement, useContext, useState } from "react";
import { API_URL } from "../config/Http";
import { Category, CategoryRequest } from "../interfaces/Category";
import { AuthContext } from "./AuthContext";

interface CategoryContextType {
  categories: Category[];
  getCategories: () => Promise<void>;
  createCategory: (categories: Omit<CategoryRequest, 'code'>) => Promise<void>;
  updateCategory: (categories: CategoryRequest) => Promise<void>;
  deleteCategory: (code: string) => Promise<void>;
  openForm: boolean;
  setOpenForm: (open: boolean) => void;
}

export const CategoryContext = createContext({} as CategoryContextType);

interface CategoryProviderProps {
  children: React.ReactNode;
}

export const CategoryProvider = ({ children }: CategoryProviderProps): ReactElement<CategoryContextType> => {
  const url = `${API_URL}/categories`
  const { token } = useContext(AuthContext)
  const [categories, setCategories] = useState<Category[]>([]);
  const [openForm, setOpenForm] = useState(false);

  const getCategories = async () => {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    const data: Category[] = await response.json()
    setCategories(data);
  };

  const createCategory = async (category: Omit<CategoryRequest, 'code'>) => {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        sessionCode: category.sessionCode,
        name: category.name
      })
    })
    await getCategories()
  };

  const updateCategory = async (category: CategoryRequest) => {
    await fetch(`${url}/${category.code}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        sessionCode: category.sessionCode,
        name: category.name
      })
    })
    await getCategories()
  };

  const deleteCategory = async (code: string) => {
    await fetch(`${url}/${code}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    await getCategories()
  };

  return (
    <CategoryContext.Provider value={{
      categories, getCategories, createCategory, updateCategory, deleteCategory, openForm, setOpenForm
    }}>
      {children}
    </CategoryContext.Provider>
  );
};