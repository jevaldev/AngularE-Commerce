import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProductsService } from 'src/app/shared/services/products.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchQuery = '';
  isAuthenticated = false;
  private authSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private authService: AuthService,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    // Nos suscribimos al observable para obtener el estado de autenticación
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;
      }
    );
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      try {
        console.log(this.productsService.searchProducts(this.searchQuery));
      } catch {}
      console.log('Busqueda: ', this.searchQuery);
    }
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
