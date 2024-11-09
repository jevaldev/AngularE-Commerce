import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products, ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.page.html',
  styleUrls: ['./product-item.page.scss'],
})
export class ProductItemPage implements OnInit {
  productId!: string;
  public product: Products[] = [];
  public loaded = false;
  public errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private productsAPI: ProductsService
  ) {}

  async getProduct(id: string) {
    this.loaded = false;

    try {
      const response: Products[] = await this.productsAPI.getProductByID(id);
      this.product = response;
      console.log(this.product);
    } catch (error: any) {
      console.error('Error al obtener productos:', error);
      this.errorMessage = error.message || 'Error al obtener los productos';
    } finally {
      this.loaded = true;
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id') || '';
      this.getProduct(this.productId);
    });
  }
}
