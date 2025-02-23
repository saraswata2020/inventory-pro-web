import axios from 'axios';
import { ApiResponse } from '../types/api-response.type';
import { Dealer } from '../types/dealer.type';

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/dealer`;

export const getAllDealers = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get<ApiResponse>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching dealers:', error);
    return {
      statusCode: 500, // Set appropriate error code
      message: 'Failed to fetch dealers',
      data: []
    };
  }
};

export const createDealer = async (data: Omit<Dealer, 'id'>): Promise<ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>(API_URL, data);
    return response.data;
  } catch (error: any) {
    console.error('Error creating dealer:', error);
    return error.response?.data ?? {
      statusCode: 500,
      message: 'Failed to create dealer',
    };
  }
};

export const updateDealer = async (id: number, data: Partial<Dealer>): Promise<ApiResponse> => {
  try {
    const response = await axios.patch<ApiResponse>(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error: any) {
    console.error('Error updating dealer:', error);
    return error.response?.data ?? {
      statusCode: 500,
      message: 'Failed to update dealer',
    };
  }
};

export const deleteDealer = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await axios.delete<ApiResponse>(`${API_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error deleting dealer:', error);
    return error.response?.data ?? {
      statusCode: 500,
      message: 'Failed to delete dealer',
    };
  }
};

export const getDealerById = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await axios.get<ApiResponse<Dealer>>(`${API_URL}/${id}`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching dealer:', error);
    throw error;
  }
};

