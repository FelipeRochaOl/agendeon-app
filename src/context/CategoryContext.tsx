import { createContext, ReactElement, useCallback, useContext, useEffect, useState } from "react";
import { Toast } from "../components/Toast";
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
  const { token, logout } = useContext(AuthContext)
  const [categories, setCategories] = useState<Category[]>([]);
  const [openForm, setOpenForm] = useState(false);

  const getCategories = useCallback(async () => {
    const response = await fetch(`${url}/list`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const { data } = await response.json()
    const categories: Category[] = data
    setCategories(categories);
  }, [url]);

  useEffect(() => {
    getCategories()
  }, [getCategories]);

  const createCategory = async (category: Omit<CategoryRequest, 'code'>) => {
    const response = await fetch(`${url}/`, {
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
    if (response.status === 403) {
      await logout()
      return
    }
    const { data } = await response.json()
    if (!data) return
    const newCategory: Category = data
    Toast({ type: 'success', text: 'Categoria adicionada com sucesso' })
    setCategories([...categories, newCategory])
  };

  const updateCategory = async (category: CategoryRequest) => {
    const response = await fetch(`${url}/${category.code}`, {
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
    if (response.status === 403) {
      await logout()
      return
    }
    Toast({ type: 'info', text: 'Categoria atualizada com sucesso' })
    await getCategories()
  };

  const deleteCategory = async (code: string) => {
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
    Toast({ type: 'warning', text: 'Categoria deletada com sucesso' })
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