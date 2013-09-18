var http = require('http'),
    httpProxy = require('http-proxy');

//
// Create a proxy server with custom application logic
//
//httpProxy.createServer(function (req, res, proxy) {
  //
  // Put your custom server logic here
  //

var options = {
  router: {
    'localhost': '127.0.0.1:9000'
  }
};

var proxyServer = httpProxy.createServer(options);
proxyServer.listen(8081);

http.createServer(function (req, res) { 
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('request successfully proxied: ' + req.url +'\n' + JSON.stringify(req.headers, true, 2));
  res.end();
}).listen(9000);