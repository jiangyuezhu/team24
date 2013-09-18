var util = require('util'),
    colors = require('colors'),
    http = require('http'),
    httpProxy = require('http-proxy'),
    url = require('url'),
    response = {};


var expectedResult = { 
  'abc': [
    'Impression',
    'Component List',
    'Button'
  ],
  'def': [
    'Impression',
    'Component List',
    'Button'
  ]
};


//
// Setup proxy server with forwarding
//
httpProxy.createServer(9000, 'localhost', {
  forward: {
    port: 8080,
    host: 'localhost/t'
  }
}).listen(8082);

http.createServer(function (req, res) {  
  var parse_url = url.parse(req.url, true);
  var query = parse_url.query || {};

  if (req.url === '/validate') {
    compareResult(response[query.id], expectedResult[query.id]);
  } else {
    response[query.i] = response[query.i] || [];
    response[query.i].push(query.dt);    
    console.log(response[query.sid]);
  }
  
  res.writeHead(200, { 'Content-Type': 'text/plain' });  
  res.end();
}).listen(9000);


function compareResult(actual, expected) {
  if (actual.length === 0 &&  expected.length === 0) {
    util.puts('Failed:'.red + 'No expected result and actual result');
    return false;
  }
  for (var i = 0; i < expected.length; i++)  {
    var expMetric = expected[i];
    for (var j = 0; j < actual.length; j++) {
      var actMetric = actual[j];
      if (actMetric === expMetric) {
        actual = actual.slice(i+1, actual.length);
        util.puts('expected '+expMetric + ' and received '+actMetric +''.green);
        break;
      }      
    }
    if (j > expected.length) {
      util.puts('expected '+expMetric + ' and but didn\'t receive a metric'.red);
    }
  }   
}
