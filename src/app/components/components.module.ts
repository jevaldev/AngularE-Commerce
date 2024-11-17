import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StatusComponent } from './status/status.component';
import { ModalComponent } from './modal/modal.component';
import { SharedComponentsModule } from '../shared/components/components.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, StatusComponent],
  exports: [LoginComponent, RegisterComponent, StatusComponent, ModalComponent],
  imports: [
    FormsModule,
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule,
    ModalComponent,
    SharedComponentsModule,
  ],
})
export class ComponentsModule {}
