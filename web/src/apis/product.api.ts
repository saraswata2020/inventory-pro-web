import axios from 'axios';
import { ApiResponse } from '../types/api-response.type';
import { Product } from '../types/product.type';

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product`;

// Get all products
export const getAllProducts = async (): Promise<ApiResponse<Product[]>> => {
  try {
    const response = await axios.get<ApiResponse<Product[]>>(API_URL);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching products:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch products');
  }
};

// Create a new product
export const createProduct = async (data: Omit<Product, 'id'>): Promise<ApiResponse<Product>> => {
  try {
    const response = await axios.post<ApiResponse<Product>>(API_URL, data);
    return response.data;
  } catch (error: any) {
    console.error('Error creating product:', error);
    throw new Error(error.response?.data?.message || 'Failed to create product');
  }
};

// Get a product by ID
export const getProductById = async (id: number): Promise<ApiResponse<Product>> => {
  try {
    const response = await axios.get<ApiResponse<Product>>(`${API_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching product:', error);
    throw new Error(error.response?.data?.message || `Failed to fetch product with ID ${id}`);
  }
};

// Update a product by ID
export const updateProduct = async (id: number, data: Partial<Product>): Promise<ApiResponse<Product>> => {
  try {
    const response = await axios.patch<ApiResponse<Product>>(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error: any) {
    console.error('Error updating product:', error);
    throw new Error(error.response?.data?.message || `Failed to update product with ID ${id}`);
  }
};

// Delete a product by ID
export const deleteProduct = async (id: number): Promise<ApiResponse<Product>> => {
  try {
    const response = await axios.delete<ApiResponse<Product>>(`${API_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error deleting product:', error);
    throw new Error(error.response?.data?.message || `Failed to delete product with ID ${id}`);
  }
};
