import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

export const CategoryContext = createContext({});

export const CategoryProvider = ({ children }) => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    async function fetchCategory() {
      const response = await api.get('/categories');
      setCategoryList(response.data);
    }
    fetchCategory();
  }, []);
  async function createCategory(entity) {
    const response = await api.post('admin/categories', entity);
    return response;
  }
  async function updateCategory(id, entity) {
    const response = await api.put(`admin/categories/${id}`, entity);
    return response;
  }
  async function deleteCategory(id) {
    const response = await api.delete(`admin/categories/${id}`);
    return response;
  }
  return (
    <CategoryContext.Provider value={{ categories: categoryList, createCategory, updateCategory, deleteCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export function useCategory() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within an CategoryProvider.');
  }
  return context;
}

export default CategoryContext;
