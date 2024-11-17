import { Injectable } from '@angular/core';
import axios from 'axios';

export interface Products {
  id: string;
  product: string;
  brand: string;
  quantity: Number;
  price: Number;
  category: string;
  stock: Number;
  offer: Number;
  fetchName: string;
  imgName: string;
}
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiURL = 'http://localhost:3000/api/products';

  async getProducts(): Promise<Products[]> {
    try {
      const response = await axios.get(`${this.apiURL}/products`);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || 'Error en la solicitud al servidor';
      } else {
        throw 'Error inesperado';
      }
    }
  }

  async getCategories(): Promise<any> {
    try {
      const response = await axios.get(`${this.apiURL}/categories`);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || 'Error en la solicitud al servidor';
      } else {
        throw 'Error inesperado';
      }
    }
  }

  async getProductByID(id: string): Promise<Products> {
    try {
      const response = await axios.get(`${this.apiURL}/products/${id}`);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || 'Error en la solicitud al servidor';
      } else {
        throw 'Error inesperado';
      }
    }
  }

  async searchProducts(searchCharacters: string): Promise<any> {
    try {
      const response = await axios.get(
        `${this.apiURL}/products/search/${searchCharacters}`
      );
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || 'Error en la solicitud al servidor';
      } else {
        throw 'Error inesperado';
      }
    }
  }
  constructor() {}
}
