import { Component, HostListener, OnInit } from '@angular/core';
import { mealCategory } from 'src/app/shared/interfaces/mealInterfaces';
import { ThemealdbAPIService } from 'src/app/shared/services/themealdb-api.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {
  public loaded = false;
  public placeholders: number[] = Array(5).fill(0);
  public recipes: any[] = [];
  public categories: mealCategory[] = [];
  public titleCategory: string = '';

  constructor(private mealApiService: ThemealdbAPIService) {}

  async getFilteredRecipes(category: string) {
    this.loaded = false;
    this.titleCategory = category;

    try {
      this.recipes = await this.mealApiService.getMealsByCategories(category);
      console.log('receta conseguidas', this.recipes);
    } catch {
    } finally {
      this.loaded = true;
    }
  }

  async getRecipesAPI() {
    try {
      const response = await this.mealApiService.getFoodAPI();
      this.recipes = response;
      console.log(this.recipes);
      this.loaded = true;
    } catch {}
  }

  async getMealsCategories() {
    try {
      const response = await this.mealApiService.getMealCategories();
      this.categories = response;
      console.log(this.categories);
    } catch (error: any) {
      throw 'Error inesperado';
    }
  }

  ngOnInit() {
    this.getRecipesAPI();
    this.getMealsCategories();
  }
}

// isOpenModal = false;

// openModal(): void {
//   this.isOpenModal = true;
// }

// closeModal(): void {
//   this.isOpenModal = false;
// }
