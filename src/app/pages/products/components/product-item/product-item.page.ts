import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Products,
  ProductsService,
} from 'src/app/shared/services/products.service';
import { ThemealdbAPIService } from 'src/app/shared/services/themealdb-api.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.page.html',
  styleUrls: ['./product-item.page.scss'],
})
export class ProductItemPage implements OnInit {
  productId!: string;
  public product: Products = {} as Products;
  public loaded = false;
  public errorMessage: string = '';
  public meals: any = [];
  numberInput: string = '';

  constructor(
    private route: ActivatedRoute,
    private productsAPI: ProductsService,
    private mealdbAPI: ThemealdbAPIService
  ) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    const initialValue = event.target.value;
    event.target.value = initialValue.replace(/[^0-9]*/g, ''); // Eliminar todo lo que no sea número
    if (initialValue !== event.target.value) {
      event.stopPropagation();
    }
  }

  async getProduct(id: string) {
    this.loaded = false;

    try {
      const response: Products = await this.productsAPI.getProductByID(id);
      this.product = response;
      this.meals = await this.mealdbAPI.getMealByIngredient(
        this.product.fetchName
      );
    } catch (error: any) {
      console.error('Error al obtener productos:', error);
      this.errorMessage = error.message || 'Error al obtener los productos';
    } finally {
      this.loaded = true;
    }
  }

  filterNumbers() {
    this.numberInput = this.numberInput.replace(/[^0-9]/g, '');
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id') || '';
      this.getProduct(this.productId);
    });
  }
}
