import { Injectable } from '@angular/core';
import axios from 'axios';

export interface mealFiltered {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}
export interface mealCategory {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}
@Injectable({
  providedIn: 'root',
})
export class ThemealdbAPIService {
  private APIUrl = ' https://www.themealdb.com/api/json/v1/1/';
  public mealCategories: mealCategory[] = [];

  // async getMealCategories() {
  //   try {
  //     const response = await axios.get(`${this.APIUrl}/categories`);
  //     this.mealCategories = response.data;
  //   } catch (error: any) {
  //     if (axios.isAxiosError(error)) {
  //       throw error.response?.data || 'Error en la solicitud al servidor';
  //     } else {
  //       throw 'Error inesperado';
  //     }
  //   }
  // }

  // async getMealsByCategories(categories: mealCategory) {
  //   await this.getMealCategories()
  //   try {
  //     const response = await axios.get(`${this.APIUrl}/www.themealdb.com/api/json/v1/1/filter.php?c=${categories}`)
  //   }
  // }

  async getMeal(id: string) {
    try {
      const response = await axios.get(`${this.APIUrl}lookup.php?i=/${id}`);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || 'Error en la solicitud al servidor';
      } else {
        throw 'Error inesperado';
      }
    }
  }

  async getMealByIngredient(ingredient: string) {
    try {
      const response = await axios.get(
        `${this.APIUrl}filter.php?i=${ingredient}`
      );
      return response.data.meals.slice(0, 10);
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
