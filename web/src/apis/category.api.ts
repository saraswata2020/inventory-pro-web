import axios from 'axios';
import { ApiResponse } from '../types/api-response.type';
import { Category } from '../types/category.type';

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/category`;

export const getAllCategories = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get<ApiResponse>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return {
      statusCode: 200,
      message: 'Success',
      data: []
    };
  }
};

export const createCategory = async (data: Omit<Category, 'id'>): Promise<ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>(API_URL, data);
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

export const updateCategory = async (id: number, data: Partial<Category>): Promise<ApiResponse> => {
  try {
    const response = await axios.patch<ApiResponse>(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

export const deleteCategory = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await axios.delete<ApiResponse>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

export const getCategoryById = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await axios.get<ApiResponse>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error;
  }
};
