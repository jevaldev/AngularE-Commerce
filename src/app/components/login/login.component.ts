import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false; // Control del loader
  errorMessage: string | null = null; // Mensaje de error

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true; // Mostrar loader
      try {
        const response = await this.authService.login(this.loginForm.value);
        console.log('Inicio de sesión exitoso', response);
        this.isLoading = false;
        this.router.navigate(['/home']); // Redirigir a la página de inicio después del inicio de sesión
      } catch (err: any) {
        this.isLoading = false; // Ocultar loader
        this.errorMessage = err?.message || 'Error en el inicio de sesión'; // Obtener el mensaje de error
        console.error('Error en el inicio de sesión', err);
      }
    }
  }
}
