export interface Product {
  id: string;
  name: string;
  categoryId: string;
  price: string
}

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  managerId: string
}

export interface Category {
  id: string;
  name: string;
}

export interface Inventory {
  id: string;
  warehouseId: string;
  productId: string;
  stock: number;
}

export interface TotalProduct { 
  name: string;
  category: string;
  stock: number;
  price: string;
}

