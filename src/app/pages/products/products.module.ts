import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsPageRoutingModule } from './products-routing.module';

import { ProductsPage } from './products.page';
import { ProductListCardComponent } from './components/product-list-card/product-list-card.component';
import { SharedComponentsModule } from 'src/app/shared/components/components.module';
import { ProductListPage } from './components/product-list/product-list.page';
import { ProductItemPage } from './components/product-item/product-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsPageRoutingModule,
    SharedComponentsModule,
  ],
  declarations: [
    ProductsPage,
    ProductListCardComponent,
    ProductListPage,
    ProductItemPage,
  ],
  exports: [ProductListCardComponent, ProductListPage, ProductItemPage],
})
export class ProductsPageModule {}
