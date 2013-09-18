var util = require('util'),
    colors = require('colors'),
    http = require('http'),
    httpProxy = require('http-proxy'),
    url = require('url');

//
// Setup proxy server with forwarding
//
httpProxy.createServer(9000, 'localhost', {
  forward: {
    port: 8080,
    host: 'localhost/t'
  }
}).listen(8082);

//
// Target Http Server
//
http.createServer(function (req, res) {  
  console.log(url.parse(req.url, true)); 
  console.log('\n');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('request successfully proxied to: ' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();
}).listen(9000);


/*util.puts('http proxy server '.blue + 'started '.green.bold + 'on port '.blue + '8003 '.yellow + 'with forward proxy'.magenta.underline);
util.puts('http server '.blue + 'started '.green.bold + 'on port '.blue + '9000 '.yellow);
util.puts('http forward server '.blue + 'started '.green.bold + 'on port '.blue + '9001 '.yellow);*/
