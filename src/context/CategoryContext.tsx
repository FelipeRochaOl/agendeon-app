import { createContext, ReactElement, useState } from "react";
import { Category, CategoryRequest } from "../interfaces/Category";

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
  const url = 'http://localhost:8080/categories/'
  const [categories, setCategories] = useState<Category[]>([]);
  const [openForm, setOpenForm] = useState(false);

  const getCategories = async () => {
    const auth = 'feliperochaoliveira@gmail.com:123456'
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(auth)
      }
    })
    const data: Category[] = await response.json()
    setCategories(data);
  };

  const createCategory = async (category: Omit<CategoryRequest, 'code'>) => {
    const auth = 'feliperochaoliveira@gmail.com:123456'
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(auth)
      },
      body: JSON.stringify({
        sessionCode: category.sessionCode,
        name: category.name
      })
    })
    await getCategories()
  };

  const updateCategory = async (category: CategoryRequest) => {
    const auth = 'feliperochaoliveira@gmail.com:123456'
    await fetch(`${url}/${category.code}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(auth)
      },
      body: JSON.stringify({
        sessionCode: category.sessionCode,
        name: category.name
      })
    })
    await getCategories()
  };

  const deleteCategory = async (code: string) => {
    const auth = 'feliperochaoliveira@gmail.com:123456'
    await fetch(`${url}/${code}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(auth)
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