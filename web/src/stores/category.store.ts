import { create } from 'zustand';
import { createCategory, updateCategory, getCategoryById, getAllCategories } from '../apis/category.api';
import { ApiResponse } from '../types/api-response.type';
import { Category } from '../types/category.type';

interface CategoryStore {
  categories: Category[];
  fetchCategories: () => Promise<ApiResponse<Category[]>>;
  addCategory: (data: Omit<Category, 'id'>) => Promise<ApiResponse<Category>>;
  editCategory: (id: number, data: Partial<Category>) => Promise<ApiResponse<Category>>;
  getCategoryById: (id: number) => Promise<Category | undefined>;
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: [],

  fetchCategories: async () => {
    try {
      const response: ApiResponse<Category[]> = await getAllCategories();
      set({ categories: response.data });
      return response;
    } catch (error: any) {
      console.error('Error fetching categories:', error);
      return {
        statusCode: 500,
        message: 'Failed to fetch categories',
        data: [],
      } as ApiResponse<Category[]>;
    }
  },

  addCategory: async (data) => {
    try {
      const response: ApiResponse<Category> = await createCategory(data);
      if (!response.data) {
        throw new Error('No category data returned from API');
      }
      if (response.data) {
        if (response.data) {
          set((state) => ({ categories: [...state.categories, response.data!] }));
        }
      }
      return response;
    } catch (error: any) {
      console.error('Error adding category:', error);
      return {
        statusCode: 400,
        message: error.message || 'Failed to add category',
        data: undefined,
      } as ApiResponse<Category>;
    }
  },

  editCategory: async (id, data) => {
    try {
      const response: ApiResponse<Category> = await updateCategory(id, data);
      set((state) => ({
        categories: state.categories.map((category) =>
          category.id === id ? { ...category, ...response.data } : category
        ),
      }));
      return response;
    } catch (error: any) {
      console.error('Error editing category:', error);
      return {
        statusCode: 400,
        message: error.message || 'Failed to edit category',
        data: undefined,
      } as ApiResponse<Category>;
    }
  },

  getCategoryById: async (id) => {
    const category = get().categories.find((c) => c.id === id);
    if (category) return category;

    try {
      const response = await getCategoryById(id);
      return response.data;
    } catch (error) {
      console.error('Error fetching category:', error);
      return undefined;
    }
  },
}));
