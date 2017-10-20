const fractal = require('./fractal.js');
const server = fractal.web.server();

server.start().then(function(){
  console.log(`Fractal server is now running.`);
});

server.stop();