self.addEventListener('push', (event) => {
  console.log('Push recibido:', event);

  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Notificación';
  const options = {
    body: data.body || 'Tienes un nuevo mensaje',
    icon: data.icon || '/assets/icons/icon-192x192.png',
    data: data.data || {},
    actions: data.actions || [],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});