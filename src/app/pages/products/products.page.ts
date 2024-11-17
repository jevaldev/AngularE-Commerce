import { Component, OnInit } from '@angular/core';
import {
  Products,
  ProductsService,
} from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  public loaded = false;
  public products: Products[] = [];
  placeholders: number[] = Array(5).fill(0);
  public errorMessage: string = '';

  constructor(private productsAPI: ProductsService) {}

  async getProducts() {
    this.loaded = false; // Inicia el loader

    try {
      const response: Products[] = await this.productsAPI.getProducts();
      this.products = response.slice(0, 5); // Asignar los productos recibidos
    } catch (error: any) {
      console.error('Error al obtener productos:', error);
      this.errorMessage = error.message || 'Error al obtener los productos'; // Mostrar el mensaje de error si lo hay
    } finally {
      this.loaded = true; // Finaliza el loader cuando se resuelve la solicitud
    }
  }

  ngOnInit() {
    this.getProducts();
  }
}
