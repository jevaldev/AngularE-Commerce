import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  public title: string = 'Todos los productos';

  constructor(
    private productAPI: ProductsService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  async getCategories() {
    this.loaded = false;

    try {
      const response = await this.productAPI.getCategories();
      this.categories = response;
      console.log(this.categories);
    } catch (error: any) {
      console.log('Error al obtener las categorias', error);
    } finally {
      this.loaded = true;
    }
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
      this.loadedProducts = true; // Finaliza el loader cuando se resuelve la solicitud
    }
  }

  async getProductsByCategory(category: string) {
    this.loadedProducts = false;
    this.title = category;
    this.cdr.detectChanges();

    try {
      const response: Products[] =
        await this.productAPI.getProductsByCategories(category);
      this.products = response;
    } catch (error: any) {
      console.error('Error al obtener productos:', error);
      this.errorMessage = error.message || 'Error al obtener los productos'; // Mostrar el mensaje de error si lo hay
    } finally {
      this.loadedProducts = true; // Finaliza el loader cuando se resuelve la solicitud
    }
  }

  async getProductsBySearch(searchQuery: string) {
    this.loadedProducts = false;

    try {
      const response = await this.productAPI.searchProducts(searchQuery);
      this.products = response;
      console.log(this.products);
    } catch (error: any) {
      console.error('Error al obtener productos:', error);
      this.errorMessage = error.message || 'Error al obtener los productos'; // Mostrar el mensaje de error si lo hay
    } finally {
      this.loadedProducts = true; // Finaliza el loader cuando se resuelve la solicitud
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const searchQuery = params['search'];
      console.log(searchQuery);
      if (searchQuery) {
        this.getProductsBySearch(searchQuery);
        this.getCategories();
      } else {
        this.getCategories();
        this.getProducts();
      }
    });
  }
}
