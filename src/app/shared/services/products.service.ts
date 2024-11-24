import { Injectable } from '@angular/core';
import axios from 'axios';

export interface Products {
  id: string;
  product: string;
  brand: string;
  quantity: number;
  price: number;
  category: string;
  stock: number;
  offer: number;
  fetchName: string;
  imgName: string;
}
export interface CartProducts {
  productID: string;
  product: string;
  imgName: string;
  amount: number;
  price: number;
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

  async getProductsByCategories(category: string) {
    try {
      const response = await axios.get(
        `${this.apiURL}/getProducts/${category}`
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

  async addProductToCart(product: object, userID: string) {
    try {
      const response = await axios.post(`${this.apiURL}/addProductsUser`, {
        userID,
        productos: [product],
      });
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || 'Error en la solicitud al servidor';
      } else {
        throw 'Error inesperado';
      }
    }
  }

  async getProductsInCart(ID: string) {
    try {
      const response = await axios.get(`${this.apiURL}/user/getProducts/${ID}`);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || 'Error en la solicitud al servidor';
      } else {
        throw 'Error inesperado';
      }
    }
  }

  saveSubscription(subscription: PushSubscription) {
    return axios.post(`${this.apiURL}/subscribe`, subscription);
  }

  constructor() {}
}
