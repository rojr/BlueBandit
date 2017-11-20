var http = require('http'),
    url = require('url'),
    fs = require('fs');

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);

  var filename = '';
  if (q.pathname == '/') {
    filename = __dirname + '/index.html';
  } else {
    filename = "." + q.pathname;
  }

  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.write(filename);
      return res.end("404 Not Found");
    }

    var contentType = '';
    if (filename.indexOf('.css') !== -1) {
      contentType = 'text/css';
    } else if (filename.indexOf('.js') !== -1) {
      contentType = 'text/javascript';
    } else if (filename.indexOf('.otf') !== -1) {
      contentType = 'text/css';
    } else {
      contentType = 'text/html';
    }

    res.writeHead(200, {'Content-Type': contentType});

    res.write(data);
    return res.end();
  });
}).listen(4445);
