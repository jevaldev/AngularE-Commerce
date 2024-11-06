import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopingCartPageRoutingModule } from './shoping-cart-routing.module';

import { ShopingCartPage } from './shoping-cart.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopingCartPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [ShopingCartPage],
})
export class ShopingCartPageModule {}
