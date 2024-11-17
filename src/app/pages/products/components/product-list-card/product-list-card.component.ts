import { Component, Input } from '@angular/core';
import { Products } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product-list-card',
  templateUrl: './product-list-card.component.html',
  styleUrls: ['./product-list-card.component.scss'],
})
export class ProductListCardComponent {
  @Input() products: Products[] = [];
}
