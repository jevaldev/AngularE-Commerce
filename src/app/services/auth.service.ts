import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Cambia esto según tu configuración

  async register(userData: {
    email: string;
    username: string;
    password: string;
  }): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/register`, userData);
      return response.data;
    } catch (error) {
      // Asegúrate de que el error sea del tipo AxiosError
      if (axios.isAxiosError(error)) {
        throw error.response?.data || 'Error en la solicitud'; // Manejar el error como desees
      } else {
        throw 'Error inesperado'; // Manejar errores no relacionados con Axios
      }
    }
  }

  async login(userData: { email: string; password: string }): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/login`, userData);
      return response.data;
    } catch (error) {
      // Asegúrate de que el error sea del tipo AxiosError
      if (axios.isAxiosError(error)) {
        throw error.response?.data || 'Error en la solicitud'; // Manejar el error como desees
      } else {
        throw 'Error inesperado'; // Manejar errores no relacionados con Axios
      }
    }
  }
}
