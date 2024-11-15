import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductListCardComponent } from './product-list-card/product-list-card.component';
import { StatusComponent } from './status/status.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ProductListCardComponent,
    StatusComponent,
  ],
  exports: [
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ProductListCardComponent,
    StatusComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule,
  ],
})
export class ComponentsModule {}
