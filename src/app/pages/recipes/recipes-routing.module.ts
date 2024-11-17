import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesPage } from './recipes.page';
import { RecipeComponent } from './components/recipe/recipe.component';

const routes: Routes = [
  {
    path: '',
    component: RecipesPage,
  },
  { path: 'recipe/:id', component: RecipeComponent },
  // { path: 'filtered/:category', component: FilteredRecipeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesPageRoutingModule {}
