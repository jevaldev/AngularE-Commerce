import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipesPageRoutingModule } from './recipes-routing.module';

import { RecipesPage } from './recipes.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { SharedComponentsModule } from 'src/app/shared/components/components.module';
import { RecipeComponent } from './components/recipe/recipe.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipesPageRoutingModule,
    ComponentsModule,
    SharedComponentsModule,
  ],
  declarations: [RecipesPage, RecipeComponent],
})
export class RecipesPageModule {}
