const http=require('http')
// const querystring=require('querystring')
// const server=http.createServer((req,res) =>{
//   console.log('method   ', req.method)
//   const url=req.url
//   console.log('url   '+ url)
//   req.query=querystring.parse(url.split('?')[1])  //url.split('?')[1]把？ 后面的取出来。 parse转成对象付给req.query
//     console.log('query: ', req.query)
//     res.end(JSON.stringify(req.query))          //再把req.query 转成字符串
// })
// server.listen(3000,()=>{
//     console.log("listening in port 3000")
// })

// const server=http.createServer((req,res) => {
//     if(req.method==='POST'){
//         console.log('req content-type:' , req.headers['content-type'])
//         let postdata=''
//         req.on('data', chunk=>{             
//             postdata=postdata+chunk.toString()  //chunk 是二进制
//         })
//         req.on('end', ()=>{
//             console.log('post Data: '+ postdata)
//             res.end('hello world')
//         })

//     }
// })

const querystring = require('querystring')
const server = http.createServer((req,res)=>{
    const method= req.method
    const url=req.url
    const path=url.split('?')[0]
    const query = querystring.parse(url.split('?')[1])
    res.setHeader('Content-type', 'application/json')
    const resData= {
        method,
        url,
        path,
        query
    }
    if (method==='GET'){
        res.end(JSON.stringify(resData))
    }
    if(method==='POST'){
        let postdata=''
        req.on('data', chunk=>{
            postdata+=chunk.toString()
        })
        req.on('end',()=>{
            resData.postdata= postdata
            res.end(
                JSON.stringify(resData)
            )
        })
    }
})


server.listen(3000)
console.log('ok')