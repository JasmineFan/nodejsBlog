const http = require('http')
const fs = require('fs')
http.createServer(function(request, response){
    if(request.url==='/'){
        const html = fs.readFileSync('test.html', 'utf8')    
        response.writeHead(200, {
            'Content-Type': 'text/html'
        })
        response.end(html)
    }
    if(request.url ==='/script.js') {
        const etag = request.headers['if-none-match']
        if(etag ==='222'){
            response.writeHead(304, {
                'Content-Type': 'text/javascript',
                'Cache-Control' : 'max-age =20000000, no-store',
                'Last-Modified':'123',
                'Etag':'222'
            })  
            response.end('')
        } else {
            response.writeHead(200, {
                'Content-Type': 'text/javascript',
                'Cache-Control' : 'max-age =20000000, no-store',
                'Last-Modified':'123',
                'Etag':'222'
            })
            response.end('console.log("script loaded 333")')
        }
        
    }
 
}).listen(8888)

console.log('server listening on 8888')