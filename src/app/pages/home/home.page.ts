import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public loaded = false;
  public products: any[] = [];
  public errorMessage: string = '';
  public FrutasVerduras: any[] = [];

  constructor(private productsAPI: ProductsService) {}

  async getProducts() {
    this.loaded = false; // Inicia el loader

    try {
      const response = await this.productsAPI.getProducts();
      this.products = response; // Asignar los productos recibidos

      this.FrutasVerduras = response.filter(
        (product: any) => product.category === 'Frutas y verduras'
      );
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
