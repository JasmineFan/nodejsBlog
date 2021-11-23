// process.stdin.pipe(process.stdout)

/* const http = require('http')
const server= http.createServer((req,res)=> {
    if(req.method==='POST'){
        req.pipe(res)
    }
})
server.listen(8000) */

/* const fs= require('fs')
const path= require('path')
const fileName1= path.resolve(__dirname, 'data.txt')
const fileNames2= path.resolve(__dirname, 'data-bak.txt')
const readStream = fs.createReadStream(fileName1)
const writeStream = fs.createWriteStream(fileNames2)
readStream.pipe(writeStream)
readStream.on('data', chunk=> {
    console.log("data in part",chunk.toString())
})
readStream.on('end', ()=> {
    console.log('copy done')
}) */

const http = require('http')
const fs= require('fs')
const path = require('path')
const fileName1 = path.resolve(__dirname,'data.txt')
const server= http.createServer((req,res)=> {
    if(req.method==='GET'){
        const readStream = fs.createReadStream(fileName1)
        readStream.pipe(res)
    }
})
server.listen(8000)