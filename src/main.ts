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

// Registra el service worker personalizado
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/custom-sw.js').then(() => {
    console.log('Service Worker personalizado registrado');
  });
}
