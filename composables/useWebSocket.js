export default function useWebSocket() {
    const connectWebSocket = (socket, url, dataRef, reconnectInterval, callback = null) => {
        socket = new WebSocket(url);
      
        socket.addEventListener('open', () => {
          console.log(`Connected to WebSocket server at ${url}.`);
          if (reconnectInterval) {
            clearInterval(reconnectInterval);
            reconnectInterval = null;
          }
        });
      
        socket.addEventListener('message', (event) => {
          const parsedData = JSON.parse(event.data);
          if (Array.isArray(parsedData)) {
            dataRef.value = parsedData;
          } else {
            dataRef.value = parsedData;
          }
        //   console.log(`Received data from ${url}:`, dataRef.value);

          if (callback) {
            callback(parsedData);
          }
        });
      
        socket.addEventListener('close', () => {
          console.log(`Disconnected from WebSocket server at ${url}.`);
          if (!reconnectInterval) {
            reconnectInterval = setInterval(() => connectWebSocket(socket, url, dataRef, reconnectInterval), 5000);
          }
        });
      };


    return {
        connectWebSocket,
    }
}




