// src/main.ts
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/assets/custom-sw.js')
    .then(() => {
      console.log('Service Worker personalizado registrado');
    })
    .catch((error) => {
      console.error('Error al registrar el Service Worker:', error);
    });
}
