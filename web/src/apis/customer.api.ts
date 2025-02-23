import axios from 'axios';
import { ApiResponse } from '../types/api-response.type';
import { Customer } from '../types/customer.type';

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer`;

export const getAllCustomers = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get<ApiResponse>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    return {
      statusCode: 200,
      message: 'Success',
      data: []
    };
  }
};

export const createCustomer = async (data: Omit<Customer, 'id'>): Promise<ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>(API_URL, data);
    return response.data;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

export const updateCustomer = async (id: number, data: Partial<Customer>): Promise<ApiResponse> => {
  try {
    const response = await axios.patch<ApiResponse>(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating customer:', error);
    throw error;
  }
};

export const deleteCustomer = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await axios.delete<ApiResponse>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error;
  }
};

export const getCustomerById = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await axios.get<ApiResponse>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer:', error);
    throw error;
  }
};
