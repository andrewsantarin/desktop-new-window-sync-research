window.addEventListener('message', function (event) {
  var data = event.data;
  var source = event.source;
  var id = source.id;

  // eslint-disable-next-line
  clients.matchAll().then(function (clients) {
    clients.forEach(function (client) {
      if (client.id === id) {
        return;
      }
      
      client.postMessage(data);
    })
  })
});
