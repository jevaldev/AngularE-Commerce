import { Component, OnInit } from '@angular/core';
import {
  Products,
  ProductsService,
} from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {
  public products: Products[] = [];
  public loaded = false;
  loadedProducts = false;
  public categories: any = [];
  public errorMessage: string = '';

  constructor(private productAPI: ProductsService) {}

  async getCategories() {
    this.loaded = false;

    try {
      const response = await this.productAPI.getCategories();
      this.categories = response;
    } catch {}
  }

  async getProducts() {
    this.loadedProducts = false;

    try {
      const response: Products[] = await this.productAPI.getProducts();
      this.products = response;
    } catch (error: any) {
      console.error('Error al obtener productos:', error);
      this.errorMessage = error.message || 'Error al obtener los productos'; // Mostrar el mensaje de error si lo hay
    } finally {
      this.loaded = true; // Finaliza el loader cuando se resuelve la solicitud
    }
  }
  ngOnInit() {
    this.getCategories();
    this.getProducts();
  }
}
