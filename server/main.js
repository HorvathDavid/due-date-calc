'use strict';
/* jshint node: true */

var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var port = process.argv[2] || 8888;
var JSON_HEADER = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  'Content-Type': 'application/json',
};
var TEXT_HEADER = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  'Content-Type': 'text/html',
};

// calculate path
// var dataDir = (path.parse(__dirname).base === 'server') ? path.join(__dirname, 'data') : ;
var dataDir = path.join(__dirname, 'data');

http.createServer(function(request, response) {
  var urlString = decodeURIComponent(request.url);

  if (/issue/.test(urlString)) {

    if (request.method == 'POST') {
      var responseObj;
      console.log('POST');
      var body = '';
      request.on('data', function(data) {
        body += data;
        console.log('THE DATA' + data);
        responseObj = {
          status: 200,
          trackerResponse: true,
        };
      });

      request.on('end', function() {
        console.log('Body: ' + body);
      });

      console.log('return ' + JSON.stringify(responseObj));
      response.writeHead(200, JSON_HEADER);
      response.end(JSON.stringify(responseObj));
    }

    return;
  }
}).listen(parseInt(port, 10));

console.log('DIR:' + dataDir);
console.log('Dummy server running at\n  => http://localhost:' + port);
