import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { meal } from 'src/app/shared/interfaces/mealInterfaces';
import { ThemealdbAPIService } from 'src/app/shared/services/themealdb-api.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit {
  recipeID!: any;
  public recipe: meal | null = null;
  public loaded = false;
  public errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    public mealdbAPI: ThemealdbAPIService
  ) {}

  async getMeal(id: any) {
    this.loaded = false;

    try {
      const response = await this.mealdbAPI.getMeal(id);
      this.recipe = response;
      console.log(this.recipe);
    } catch (error: any) {
      console.error('Error al obtener productos:', error);
      this.errorMessage = error.message || 'Error al obtener los productos';
    } finally {
      this.loaded = true;
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.recipeID = params.get('id') || '';
      this.getMeal(this.recipeID);
    });
  }
}
