const { getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog } = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/resModel')

const loginCheck = (req) => {
    if(! req.session.username) {
        return Promise.resolve(
            new ErrorModel('用户没登录')
        )
    }
}

const handleBlogRouter=(req,res) => {
    const method = req.method
    const id=req.query.id || ''
    if(method === 'GET' && req.path ==='/api/blog/list'){
        let author =req.query.author || ''
        const keyword = req.query.keyword || ''

        if(req.query.isadmin){
            const loginCheckResult = loginCheck(req)
            if (loginCheckResult) {
                return loginCheckResult
            }
            author= req.session.username
        }

        const result = getList (author, keyword)
        return result.then(listdata => {
            return new SuccessModel(listdata)
        }) 
    }
    if(method ==='GET' && req.path==='/api/blog/detail'){
        const result = getDetail(id)
        return result.then(data=>{
            return   new SuccessModel(data)
        })
    }
   
    if(method === 'POST' && req.path ==='/api/blog/new') {
        const loginCheckResult =loginCheck(req)
        if(loginCheckResult) {
            return loginCheckResult
        }
        req.body.author = req.session.username
        const result= newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })   
    }
    if (method === 'POST' && req.path ==='/api/blog/update') {
        const loginCheckResult =loginCheck(req)
        if(loginCheckResult) {
            return loginCheckResult
        }
        const result= updateBlog(id, req.body)
        return result.then(val => {
            if(val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('更新博客失败')
            }
        }) 
    }
    if(method === 'POST' && req.path === '/api/blog/del') {
        const loginCheckResult =loginCheck(req)
        if(loginCheckResult) {
            return loginCheckResult
        }
        const author = req.session.username
        const result= delBlog(id, author) 
        return result.then(data=> {
            if(data) {
                return new SuccessModel()
            } else {
                return new ErrorModel('删除博客失败')
            }
        })
    }
}
module.exports = handleBlogRouter