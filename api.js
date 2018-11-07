var http = require('http');
var port = 3000;

var requestHandler = function(request, response) {
  console.log(request.url);
  response.end('Hello World!');
}


