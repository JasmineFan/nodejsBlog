const router = require('koa-router')()
const { getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')
router.get('/list', async function (ctx, next) {
    let author = ctx.query.author || ''
    const keyword = ctx.query.keyword || ''

    if (ctx.query.isadmin) {
        console.log('is admin ')
        // const loginCheckResult = loginCheck(req)
        // if (loginCheckResult) {
        //     return loginCheckResult
        // }
        if (ctx.session.username == null) {
            console.log('is admin, but no login ')
            ctx.body = new ErrorModel('未登录')

            return
        }
        author = ctx.session.username
    }
    const listdata = await getList(author, keyword)
    ctx.body = new SuccessModel(listdata)

})

router.get('/detail', async function (ctx, next) {
    const data = await getDetail(ctx.query.id)
    ctx.body = new SuccessModel(data)

})
router.post('/new', loginCheck, async function (ctx, next) {
    const body = ctx.request.body
    body.author = ctx.session.username
    const data = await newBlog(body)
    ctx.body = new SuccessModel(data)
})

router.post('/update',loginCheck, async function (ctx, next) {
    const val = await updateBlog(ctx.query.id, ctx.request.body)
    if (val) {
        ctx.body = new SuccessModel()
    } else {
        ctx.body = ErrorModel('更新博客失败')
    }
})
router.post('/del', loginCheck, async function (ctx, next) {
    const author = ctx.session.username
    const data = await delBlog(ctx.query.id, author)
    if (data) {
        ctx.body = new SuccessModel()
    } else {
        ctx.body = new ErrorModel('删除博客失败')
    }
})



module.exports = router