import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

export const AdminContext = createContext({});
export const AdminProvider = ({ children }) => {
    async function getProducts() {
        const response = await api.get('/product');
        return response.data;
    }
    async function getCategories() {
        const response = await api.get('/categories');
        return response.data;
    }
    async function getUserById(id) {
        const response = await api.get(`/users/${id}`);
        return response;
    }
    async function deleteById(id) {
        const response = await api.delete(`/admin/products/${id}`);
        return response;
    }
    async function getLectures() {
        const response = await api.get('/admin/users');
        let data = [];
        for (let item of response) {
            if (item.role == 1) {
                data.push(item)
            }
        }
        return data;
    }
    async function getStudent() {
        const response = await api.get('/admin/users');
        let data = [];
        for (let item of response) {
            if (item.role == 0) {
                data.push(item)
            }
        }
        return data;
    }
    async function createAccLecturers(data) {
        const response = await api.post('/admin/users', data);
        return response;
    }
    async function createProduct(entity) {
        console.log(entity);
        const response = await api.post('/product/create-product',{ entity});
        return response.data;
    }
    async function deleteAccLecturers(id) {
        const response = await api.delete(`/admin/users/${id}`);
        return response;
    }
    async function deleteAccStudent(id) {
        const response = await api.delete(`/admin/users/${id}`);
        return response;
    }
    async function updatePassAccLecturers(id, data) {
        const response = await api.delete(`/admin/users/${id}`, data);
        return response;
    }
    async function totalCoursesOfLec(user_id) {
        const response = await api.get('/admin/products');
        let count = 0;
        for (let item of response) {
            if (item.user_id == user_id) {

                count++;
            }
        }
        return count;
    }
    return (
        <AdminContext.Provider value={{ createProduct, getProducts, getCategories, getUserById, deleteById, getLectures, getStudent, totalCoursesOfLec, createAccLecturers, deleteAccLecturers, updatePassAccLecturers, deleteAccStudent }}>
            {children}
        </AdminContext.Provider>
    );
};

export function useAdmin() {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useCategory must be used within an CategoryProvider.');
    }
    return context;
}

export default AdminContext;
