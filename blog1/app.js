const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const { get, set } = require('./src/db/redis')
const querystring =require('querystring')
const {access} = require('./src/utils/log')

//const SESSION_DATA = {}

const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime()+(24*60*60*1000))
    console.log('d.toGMTString() is', d.toGMTString())
    return d.toGMTString()
}

const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST'){
            resolve({})
            return
        }
        if(req.headers['content-type'] !== 'application/json'){
            resolve({})
            return
        }
        let postData =''
        req.on('data', chunk=>{
            postData += chunk.toString()
        })
        req.on('end', ()=> {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const serverHandle = (req, res)=>{
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

    res.setHeader('Content-type','application/json')

    const url = req.url
    req.path = url.split('?')[0]
    req.query = querystring.parse(url.split('?')[1])

    //解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''   //k1=v1;k2=v2
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        console.log(key, val)
        req.cookie[key] = val
    })
    console.log('request cookie ', req.cookie)

    //解析session
/*     let needSetCookie = false
    let userId = req.cookie.userId
    console.log('user id is ', userId)
    if (userId) {
        if(!SESSION_DATA[userId]){
            SESSION_DATA[userId] = {}
        }
    } else {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId] */
    let needSetCookie = false
    let userId = req.cookie.userId
    if(!userId) {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        set(userId, {})
    }
    req.sessionId = userId
    get(req.sessionId).then(sessionData => {
        if(sessionData == null) {
            set(req.sessionId, {})
            req.session = {}
        } else {
            req.session = sessionData
        }
        console.log('req.session', req.session)
        return  getPostData(req)
    })
   .then(postData=> {
        req.body= postData
        // const blogData = handleBlogRouter(req, res)
        // if (blogData) {
        //     res.end(
        //         JSON.stringify(blogData)
        //     )
        //     return
        // }
       
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie',`userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }   

        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then(userData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie',`userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }
        // const userData = handleUserRouter(req, res)
        // if(userData) {
        //     res.end(
        //         JSON.stringify(userData)
        //     )
        //     return
        // }
    
        res.writeHead(404, {'Content-type':'text/plain'})
        res.write('404 Not Found\n')
        res.end()
    })

  
}
module.exports=serverHandle