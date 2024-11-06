import { Injectable } from '@angular/core';
import axios from 'axios';

export interface Products {
  id: String;
  product: String;
  brand: String;
  quantity: Number;
  price: Number;
  category: String;
  stock: Number;
  offer: Number;
  imgName: String;
}
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiURL = 'http://localhost:3000';

  async getProducts(): Promise<Products[]> {
    try {
      const response = await axios.get(`${this.apiURL}/products/products`);
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
      const response = await axios.get(`${this.apiURL}/products/categories`);
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
