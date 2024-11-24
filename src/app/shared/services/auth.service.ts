import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private authenticatedSubject = new BehaviorSubject<boolean>(false);
  public user: object = {};

  constructor() {
    this.checkoutAuthenticationStatus();
  }

  private async checkoutAuthenticationStatus(): Promise<void> {
    try {
      const response = await axios.get(`${this.apiUrl}/status`, {
        withCredentials: true,
        timeout: 5000,
      });
      this.authenticatedSubject.next(response.data.authenticated);
    } catch (error) {
      this.authenticatedSubject.next(false);
    }
  }

  get isAuthenticated$() {
    return this.authenticatedSubject.asObservable();
  }

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
      const response = await axios.post(`${this.apiUrl}/login`, userData, {
        withCredentials: true,
      });
      this.authenticatedSubject.next(true);
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

  async getUserInfo() {
    let userInfo;
    let authenticated;

    try {
      const response = await axios.get(`${this.apiUrl}/status`, {
        withCredentials: true,
        timeout: 5000,
      });
      userInfo = response.data.user;
      authenticated = response.data.authenticated;
      return { userInfo, authenticated };
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
