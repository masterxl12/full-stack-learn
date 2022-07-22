let app = require('./app');
let http = require('http')

const port = process.env.PORT || 8000;
const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  console.error(error);
}

function onListening(params) {
  console.log('Listening on ' + port);
}