const app = require('./app');
const http = require('http');

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  console.log('Server started, listening on ' + bind);
};

const port = 3000;

app.set('port', port);

const server = http.createServer(app);

server.on("listening", onListening);

server.listen(port);