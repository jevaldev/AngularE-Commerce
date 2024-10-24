import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'shoping-cart',
    loadChildren: () =>
      import('./pages/shoping-cart/shoping-cart.module').then(
        (m) => m.ShopingCartPageModule
      ),
  },
  {
    path: 'product-item',
    loadChildren: () =>
      import('./pages/product-item/product-item.module').then(
        (m) => m.ProductItemPageModule
      ),
  },
  {
    path: 'product-list',
    loadChildren: () =>
      import('./pages/product-list/product-list.module').then(
        (m) => m.ProductListPageModule
      ),
  },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./pages/recipes/recipes.module').then((m) => m.RecipesPageModule),
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
