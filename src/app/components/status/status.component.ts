import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent {
  requestPermission() {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Permiso concedido');
      } else {
        console.log('Permiso denegado');
      }
    });
  }

  sendNotification() {
    const options = {
      body: 'Gracias por usar la aplicación SaboresBase',
      icon: 'assets/icon/favicon.png',
      actions: [
        { action: 'open', title: 'Abrir App' },
        { action: 'close', title: 'Cerrar Notificación' },
      ],
    };

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification('¡Hola usuario!', options);
      });
    }
  }
}
