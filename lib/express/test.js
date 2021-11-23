const express = require('./like-express')

const app = express()

app.use((req, res, next)=> {
    console.log('请求开始...', req.method, req.url)
    next()
})

app.use((req, res, next)=> {
    req.cookie ={
        userId:'123abc'
    }
    next()
})

app.use((req, res, next)=> {
    setTimeout(()=> {
        req.body = {
            a:100,
            b:200
        }
        next()
    })
})

app.use('/api',(req,res, next)=> {
    console.log('处理/api router')
    next()
})

app.get('/api',(req,res, next)=> {
    console.log('get/api router')
    next()
})

app.post('/api',(req,res, next)=> {
    console.log('post/api router do we have this?')
    next()
})

function loginCheck(req,res, next){
    console.log('login success')
    setTimeout(()=> {
        next()
    })
}

app.get('/api/get-cookie',loginCheck, (req,res, next)=> {
    console.log('get/api/get-cookie')
    res.json({
        errno: 0,
        data: req.cookie
    })
})

app.post('/api/get-post-data',(req,res, next)=> {
    console.log('post /api/get-post-data')
    res.json({
        errno: 0,
        data: req.body
    })
})


app.use((req,res,next)=> {
    console.log('处理404')
    res.json({
        errno:-1,
        msg: '404 not found'
    })

})
app.listen(8000, ()=> {
    console.log('server is running on 8000')
})