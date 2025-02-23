export interface Product {
  id: number; 
  name: string;
  sku: string;
  companyName: string;
  price: number;
  stock: number;
  categoryId: number;
  dealerId?: number;
  discount?: number;
}
