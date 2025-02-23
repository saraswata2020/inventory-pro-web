import { create } from 'zustand';
import {
  getAllCustomers,
  createCustomer as createCustomerApi,
  updateCustomer as updateCustomerApi,
  deleteCustomer as deleteCustomerApi,
  getCustomerById
} from '../apis/customer.api';
import { ApiResponse } from '../types/api-response.type';
import { Customer } from '../types/customer.type';

interface CustomerStore {
  customers: Customer[];
  fetchCustomers: () => Promise<ApiResponse>;
  createCustomer: (data: Omit<Customer, 'id'>) => Promise<ApiResponse>;
  updateCustomer: (id: number, data: Partial<Customer>) => Promise<ApiResponse>;
  deleteCustomer: (id: number) => Promise<ApiResponse>;
  getCustomerById: (id: number) => Promise<Customer | undefined>;
}

export const useCustomerStore = create<CustomerStore>((set, get) => ({
  customers: [],
  fetchCustomers: async () => {
    const response: ApiResponse = await getAllCustomers();
    set({ customers: response.data });
    return response;
  },
  createCustomer: async (data) => {
    const response = await createCustomerApi(data);
    await useCustomerStore.getState().fetchCustomers();
    return response;
  },
  updateCustomer: async (id, data) => {
    const response = await updateCustomerApi(id, data);
    await useCustomerStore.getState().fetchCustomers();
    return response;
  },
  deleteCustomer: async (id) => {
    const response = await deleteCustomerApi(id);
    await useCustomerStore.getState().fetchCustomers();
    return response;
  },
  getCustomerById: async (id) => {
    const customer = get().customers.find((c) => c.id === id);
    if (customer) return customer;
    
    try {
      const response = await getCustomerById(id);
      return response.data;
    } catch (error) {
      console.error('Error fetching customer:', error);
      return undefined;
    }
  },
}));
