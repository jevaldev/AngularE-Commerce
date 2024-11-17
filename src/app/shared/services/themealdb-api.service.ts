import { Injectable } from '@angular/core';
import axios from 'axios';
import { meal, mealCategory, meals } from '../interfaces/mealInterfaces';

@Injectable({
  providedIn: 'root',
})
export class ThemealdbAPIService {
  private APIUrl = ' https://www.themealdb.com/api/json/v1/1/';
  public mealCategories: mealCategory[] = [];
  public recipes: meals[] = [];
  public recipe: meal | null = null;

  getIngredients = (meal: { [key: string]: any }): string[] => {
    return Object.keys(meal)
      .filter((key) => key.startsWith('strIngredient') && meal[key])
      .map((key) => meal[key]);
  };

  async getFoodAPI() {
    try {
      const res = await axios.get(`${this.APIUrl}search.php?f=b`);
      const data = res.data.meals as meals[];
      this.recipes = data.map((meal) => ({
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strMealThumb: meal.strMealThumb,
        strCategory: meal.strCategory,
        strTags: meal.strTags,
      }));
      return this.recipes;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || 'Error en la solicitud al servidor';
      } else {
        throw 'Error inesperado';
      }
    }
  }

  async getMealCategories() {
    try {
      const response = await axios.get(`${this.APIUrl}categories.php`);
      this.mealCategories = response.data.categories;
      return this.mealCategories;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || 'Error en la solicitud al servidor';
      } else {
        throw 'Error inesperado';
      }
    }
  }

  async getMealsByCategories(category: string) {
    try {
      const response = await axios.get(
        `${this.APIUrl}filter.php?c=${category}`
      );
      const data = response.data.meals as meals[];
      console.log(data);
      this.recipes = data.map((meal) => ({
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strMealThumb: meal.strMealThumb,
        strCategory: meal.strCategory,
        strTags: meal.strTags,
      }));
      console.log(this.recipes);
      return this.recipes;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || 'Error en la solicitud al servidor';
      } else {
        throw 'Error inesperado';
      }
    }
  }

  async getMeal(id: string) {
    console.log(id);
    try {
      const response = await axios.get(`${this.APIUrl}lookup.php?i=${id}`);
      const data: any = response.data;
      if (data.meals) {
        const mealData = data.meals.map((meal: { [key: string]: any }) => {
          const {
            idMeal = null,
            strMeal = null,
            strCategory = null,
            strArea = null,
            strInstructions = null,
            strMealThumb = null,
            strTags = null,
            strYoutube = null,
            strSource = null,
          } = meal;

          return {
            idMeal,
            strMeal,
            strCategory,
            strArea,
            strInstructions,
            strMealThumb,
            strTags,
            strYoutube,
            strSource,
            ingredients: this.getIngredients(meal),
          };
        });

        // console.log(mealData);
        this.recipe = mealData[0];
      }

      return this.recipe;
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
