if (navigator && navigator.serviceWorker) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    console.log('Found SWs. Unregistering.');
    for (let registration of registrations) {
      console.log('Unregistering ', registration);
      registration.unregister();
    }
  });
}
