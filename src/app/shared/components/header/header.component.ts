import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Nos suscribimos al observable para obtener el estado de autenticación
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;
      }
    );

    this.route.queryParams.subscribe((params) => {
      if (params['search']) {
        this.searchQuery = params['search'];
      }
    });
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/products/product-list'], {
        queryParams: { search: this.searchQuery.trim() },
      });
    }
  }

  isActive(url: string): boolean {
    return this.router.url.includes(url);
  }
}
