import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {
  public loaded = false;
  public categories: any = [];
  constructor(private productAPI: ProductsService) {}

  async getCategories() {
    this.loaded = false;

    try {
      const response = await this.productAPI.getCategories();
      this.categories = response;
    } catch {}
  }
  ngOnInit() {
    this.getCategories();
  }
}
