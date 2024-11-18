import { Component, Input, OnInit } from '@angular/core';
import { Products } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() products: Products[] | null = null;
}
