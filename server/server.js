'use strict';
/* jshint node: true */

var Tracker = require('./util/Tracker.js');
var http = require('http');
var qs = require('querystring');
var url = require('url');
var port = process.argv[2] || 8888;
var HEADER = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
};

http.createServer(function(request, response) {
  var urlString = decodeURIComponent(request.url);

  if (/load/.test(urlString)) {
    if (request.method == 'GET') {
      Tracker.loadIssues()
      .then(function(data) {
        response.writeHead(200, HEADER);
        response.end(JSON.stringify(data));
      }.bind(this))
      .catch(function(err) {
        console.error(err);
      }.bind(this));
    }
  }

  if (/issue/.test(urlString)) {
    if (request.method == 'POST') {
      var responseObj;
      var body = '';
      request.on('data', function(chunk) {
        body += chunk;
      });

      request.on('end', function() {
        var data;
        try {
          data = qs.parse(body);
        } catch (err) {
          console.error(err);
        }

        if (data) {
          Tracker.updateIssues(data)
            .then(function() {
              response.writeHead(200, HEADER);
              response.end();
            }.bind(this))
            .catch(function(err) {
              console.error(err);
              response.writeHead(404, HEADER);
              response.end();
            }.bind(this));
        }
      });

    }
  }

}).listen(parseInt(port, 10));

console.log('Dummy server running at\n  => http://localhost:' + port);
