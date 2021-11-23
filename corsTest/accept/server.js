const http = require('http')
const fs = require('fs')
const zlib = require('zlib')
http.createServer(function (request, response) {

  const html = fs.readFileSync('test.html') //去掉'utf8'， 因为gzip 需要buffer

    response.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Encoding':'gzip'
    })
    response.end(zlib.gzipSync(html))
 

}).listen(8888)

console.log('server listening on 8888')