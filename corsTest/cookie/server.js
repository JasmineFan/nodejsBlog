const http = require('http')
const fs = require('fs')
http.createServer(function(request, response){
    const host = request.headers.host
   
    if(request.url==='/'){
        const html = fs.readFileSync('test.html', 'utf8')   
        if (host ==='test.com:8888') {
          console.log("host inside", host)
            response.writeHead(200, {
                'Content-Type': 'text/html',
                'Set-Cookie': ['id=123', 'name=aaa; domain=test.com']
            })
        }      
        response.end(html)
    }
}).listen(8888)

console.log('server listening on 8888')