import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import {
  CartProducts,
  ProductsService,
} from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.page.html',
  styleUrls: ['./shoping-cart.page.scss'],
})
export class ShopingCartPage implements OnInit {
  products: CartProducts[] = [];
  totalOfProducts = 0;
  totalPrice = 0;

  constructor(
    private productsAPI: ProductsService,
    private authService: AuthService
  ) {}

  async getProducts() {
    const { userInfo } = await this.authService.getUserInfo();

    if (!userInfo.userID) {
      alert('Error al obtener tu información porfavor intentalo de nuevo');
      return;
    }

    try {
      const response = await this.productsAPI.getProductsInCart(
        userInfo.userID
      );
      this.products = response;
      this.totalOfProducts = this.products.reduce(
        (acc, product) => acc + product.amount,
        0
      );
      this.totalPrice = this.products.reduce(
        (acc, product) => acc + product.price * product.amount,
        0
      );
      console.log(this.products);
    } catch {}
  }

  ngOnInit() {
    this.getProducts();
  }
  async subscribeToNotifications() {
    try {
      // Solicitar permiso para mostrar notificaciones
      const permission = await Notification.requestPermission();

      if (permission !== 'granted') {
        alert('Debes otorgar permiso para recibir notificaciones.');
        return;
      }

      // Registrar el Service Worker
      const registration = await navigator.serviceWorker.register(
        '/assets/custom-sw.js'
      );

      // Crear suscripción push
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(
          'BABOpSVUxWV70v7N27kJw0SdQKBbO6h-f0xPBl576PQrhiq_ZVjR8xjoIVClt3bYAhe86y_BVMeipq6iFJ3qLss'
        ),
      });

      // Envía la suscripción al servidor para almacenar
      await this.productsAPI.saveSubscription(subscription);

      alert('Te has suscrito para recibir notificaciones del carrito.');
    } catch (error) {
      console.error('Error al suscribirse:', error);
      alert(
        'Hubo un error al intentar suscribirte. Por favor, inténtalo más tarde.'
      );
    }
  }

  // Utilidad para convertir la clave de aplicación del servidor
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}
