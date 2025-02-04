// Create a web server

// 1. Load the http module
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

// 2. Create a server
http.createServer(function (request, response) {
  console.log('request ', request.url);
  var pathname = url.parse(request.url).pathname;
  console.log('pathname ', pathname);
  var filePath = path.join(__dirname, 'public', pathname);
  console.log('filePath ', filePath);

  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      response.writeHead(404, {
        'Content-Type': 'text/html'
      });
      response.end('<h1>404 Not Found</h1>');
    } else {
      response.writeHead(200, {
        'Content-Type': 'text/html'
      });
      response.end(data);
    }
  });

}).listen(3000);

console.log('Server running at http://