import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
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
  public errorForm: string = '';
  public meals: any = [];
  quantity: string = '1';

  constructor(
    private route: ActivatedRoute,
    private productsAPI: ProductsService,
    private mealdbAPI: ThemealdbAPIService,
    private authService: AuthService
  ) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    const initialValue = event.target.value;
    event.target.value = initialValue.replace(/[^0-9]*/g, ''); // Eliminar todo lo que no sea número
    if (initialValue !== event.target.value) {
      event.stopPropagation();
    }
  }

  async addToCart(form: any) {
    const { userInfo, authenticated } = await this.authService.getUserInfo();
    if (Number(this.quantity) > this.product.stock) {
      this.showErrorMessage('No hay suficiente stock de este producto');
      return;
    }
    if (authenticated == false) {
      this.showErrorMessage('Porfavor ingresa con tu cuenta porfavor');
      return;
    }

    if (!userInfo.userID) {
      this.showErrorMessage(
        'Problema al obtener tu información. Porfavor intentalo de nuevo'
      );
      return;
    }

    const selectedProduct = {
      productID: this.product.id,
      product: this.product.product,
      imgName: this.product.imgName,
      price: Number(this.product.price),
      amount: Number(this.quantity),
    };
    try {
      const response = await this.productsAPI.addProductToCart(
        selectedProduct,
        userInfo.userID
      );
      alert(response);
    } catch {}
    // console.log(
    //   'Producto seleccionado: ',
    //   selectedProduct,
    //   'usuario: ',
    //   userInfo.userID
    // );
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
    this.quantity = this.quantity.replace(/[^0-9]/g, '');
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id') || '';
      this.getProduct(this.productId);
    });
  }

  showErrorMessage(message: string) {
    this.errorForm = message;
    setTimeout(() => {
      this.errorForm = '';
    }, 3000);
    return;
  }
}
