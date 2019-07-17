export function registerMessages() {
  window.addEventListener('message', (event) => {
    const { data, source: { id } } = event;

    // eslint-disable-next-line
    clients.matchAll().then((clients) => {
      clients.forEach(client => {
        if (client.id === id) {
          return;
        }
        
        client.postMessage(data);
      })
    })
  });
}
