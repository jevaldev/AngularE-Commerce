import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsPage } from './products.page';
import { ProductListPage } from './components/product-list/product-list.page';
import { ProductItemPage } from './components/product-item/product-item.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsPage,
  },
  { path: 'product-list', component: ProductListPage },
  { path: 'product-item/:id', component: ProductItemPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsPageRoutingModule {}
