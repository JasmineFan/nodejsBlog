const http = require('http')
const server = http.createServer((req,res)=> {
    console.log('cur time', Date.now())
    console.error('seems there is a error', Date.now())

    if(req.url ==='/err') {
        throw new Error('/err 出错了')
    }
    res.setHeader('Content-type','application/json')
    res.end(
        JSON.stringify({
            errno:0,
            message: 'pm2 test server 3'
        })
    )
})

server.listen(8000)
console.log('server is listening on port 8000')