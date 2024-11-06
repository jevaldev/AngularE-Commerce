import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiURL = 'http://localhost:3000';

  async getProducts(): Promise<any> {
    try {
      // Esperar a que axios resuelva la solicitud
      const response = await axios.get(`${this.apiURL}/products`);
      return response.data; // Retornar solo los datos de la respuesta
    } catch (error: any) {
      // Asegúrate de que el error sea del tipo AxiosError
      if (axios.isAxiosError(error)) {
        throw error.response?.data || 'Error en la solicitud'; // Manejar el error como desees
      } else {
        throw 'Error inesperado'; // Manejar errores no relacionados con Axios
      }
    }
  }
  constructor() {}
}
