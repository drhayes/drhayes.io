if (navigator && navigator.serviceWorker) {
  console.log('Supports SWs.');
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    if (registrations && registrations.length) {
      console.log('Found registrations:', registrations);
      for (let registration of registrations) {
        console.log('Unregistering ', registration);
        registration.unregister();
      }
    }
  });
}
