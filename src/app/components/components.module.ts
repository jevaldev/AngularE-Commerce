import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductListCardComponent } from './product-list-card/product-list-card.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ProductListCardComponent,
  ],
  exports: [
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ProductListCardComponent,
  ],
  imports: [CommonModule, IonicModule, RouterModule, ReactiveFormsModule],
})
export class ComponentsModule {}
