import { create } from 'zustand';
import { createProduct, getAllProducts, updateProduct, deleteProduct, getProductById } from '../apis/product.api';
import { ApiResponse } from '../types/api-response.type';
import { Product } from '../types/product.type';


interface ProductStore {
  products: Product[];
  fetchProducts: () => Promise<ApiResponse<Product[]>>;
  addProduct: (data: Omit<Product, 'id'>) => Promise<ApiResponse<Product>>;
  editProduct: (id: number, data: Partial<Product>) => Promise<ApiResponse<Product>>;
  removeProduct: (id: number) => Promise<ApiResponse<Product>>;
  getProductById: (id: number) => Promise<Product | undefined>;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],

  fetchProducts: async () => {
    try {
      const response: ApiResponse<Product[]> = await getAllProducts();
      set({ products: response.data });
      return response;
    } catch (error: any) {
      console.error('Error fetching products:', error);
      return {
        statusCode: 500,
        message: 'Failed to fetch products',
        data: [],
      } as ApiResponse<Product[]>;
    }
  },

  addProduct: async (data) => {
    try {
      const response: ApiResponse<Product> = await createProduct(data);
  
      if (!response.data) {
        throw new Error('No product data returned from API');
      }
  
      set((state) => ({ products: [...state.products, response.data! ] }));
  
      return response;
    } catch (error: any) {
      console.error('Error adding product:', error);
      return {
        statusCode: 400,
        message: error.message || 'Failed to add product',
        data: undefined,
      } as ApiResponse<Product>;
    }
  },

  editProduct: async (id, data) => {
    try {
      const response: ApiResponse<Product> = await updateProduct(id, data);
      set((state) => ({
        products: state.products.map((product) =>
          product.id === id ? { ...product, ...response.data } : product
        ),
      }));
      return response;
    } catch (error: any) {
      console.error('Error editing product:', error);
      return {
        statusCode: 400,
        message: error.message || 'Failed to edit product',
        data: undefined,
      } as ApiResponse<Product>;
    }
  },

  removeProduct: async (id) => {
    try {
      const response: ApiResponse<Product> = await deleteProduct(id);
      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
      }));
      return response;
    } catch (error: any) {
      console.error('Error removing product:', error);
      return {
        statusCode: 400,
        message: error.message || 'Failed to remove product',
        data: undefined,
      } as ApiResponse<Product>;
    }
  },

  getProductById: async (id) => {
    const product = get().products.find((p) => p.id === id);
    if (product) return product;

    try {
      const response = await getProductById(id);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      return undefined;
    }
  },

}));
