// filepath: /src/stores/dealer.store.ts
import { create } from 'zustand';
import { getAllDealers, createDealer, updateDealer, deleteDealer, getDealerById } from '../apis/dealer.api';
import { ApiResponse } from '../types/api-response.type';
import { Dealer } from '../types/dealer.type';

interface DealerStore {
  dealers: Dealer[];
  fetchDealers: () => Promise<ApiResponse<Dealer[]>>;
  addDealer: (data: Omit<Dealer, 'id'>) => Promise<ApiResponse<Dealer>>;
  editDealer: (id: number, data: Partial<Dealer>) => Promise<ApiResponse<Dealer>>;
  removeDealer: (id: number) => Promise<ApiResponse<Dealer>>;
  getDealerById: (id: number) => Promise<Dealer | undefined>;
}

export const useDealerStore = create<DealerStore>((set, get) => ({
  dealers: [],

  fetchDealers: async () => {
    try {
      const response: ApiResponse<Dealer[]> = await getAllDealers();
      set({ dealers: response.data });
      return response;
    } catch (error: any) {
      console.error('Error fetching dealers:', error);
      return {
        statusCode: 500,
        message: 'Failed to fetch dealers',
        data: [],
      } as ApiResponse<Dealer[]>;
    }
  },

  addDealer: async (data) => {
    try {
      const response: ApiResponse<Dealer> = await createDealer(data);
      if (!response.data) {
        throw new Error('No dealer data returned from API');
      }
      if (response.data) {
        set((state) => ({ dealers: [...state.dealers, response.data! ] }));
      }
      return response;
    } catch (error: any) {
      console.error('Error adding dealer:', error);
      return {
        statusCode: 400,
        message: error.message || 'Failed to add dealer',
        data: undefined,
      } as ApiResponse<Dealer>;
    }
  },

  editDealer: async (id, data) => {
    try {
      const response: ApiResponse<Dealer> = await updateDealer(id, data);
      set((state) => ({
        dealers: state.dealers.map((dealer) =>
          dealer.id === id ? { ...dealer, ...response.data } : dealer
        ),
      }));
      return response;
    } catch (error: any) {
      console.error('Error editing dealer:', error);
      return {
        statusCode: 400,
        message: error.message || 'Failed to edit dealer',
        data: undefined,
      } as ApiResponse<Dealer>;
    }
  },

  removeDealer: async (id) => {
    try {
      const response: ApiResponse<Dealer> = await deleteDealer(id);
      set((state) => ({
        dealers: state.dealers.filter((dealer) => dealer.id !== id),
      }));
      return response;
    } catch (error: any) {
      console.error('Error removing dealer:', error);
      return {
        statusCode: 400,
        message: error.message || 'Failed to remove dealer',
        data: undefined,
      } as ApiResponse<Dealer>;
    }
  },

  getDealerById: async (id) => {
    const dealer = get().dealers.find((d) => d.id === id);
    if (dealer) return dealer;

    try {
      const response = await getDealerById(id);
      return response.data;
    } catch (error) {
      console.error('Error fetching dealer:', error);
      return undefined;
    }
  },
}));