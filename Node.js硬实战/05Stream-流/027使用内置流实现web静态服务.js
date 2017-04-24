var http = require('http')
var fs = require('fs')

/*http.createServer((req, res) => {
  fs.readFile(__dirname + '/index.html', (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end(String(err));
    } else {
      res.end(data)
    }
  })
}).listen(8080)*/

// 改进
http.createServer((req, res) => {
  fs.createReadStream(__dirname + '/index.html').pipe(res);
}).listen(8080)