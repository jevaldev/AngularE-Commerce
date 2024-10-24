import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      try {
        const response = await this.authService.register(
          this.registerForm.value
        );
        console.log('Registro exitoso', response);
        this.isLoading = false;
        this.router.navigate(['/login']);
      } catch (err: any) {
        this.isLoading = false;
        this.errorMessage = err?.message || 'Error en el registro';
        console.error('Error en el registro', err);
      }
    }
  }
}
