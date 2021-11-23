var express = require('express');
var router = express.Router();
const { getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog } = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')


router.get('/list', function(req, res, next) {
  let author =req.query.author || ''
  const keyword = req.query.keyword || ''

  if(req.query.isadmin){
    console.log('is admin ')
      // const loginCheckResult = loginCheck(req)
      // if (loginCheckResult) {
      //     return loginCheckResult
      // }
      if (req.session.username== null) {
        console.log('is admin, but no login ')
        res.json(
          new ErrorModel('未登录')
        )
        return
      }
      author= req.session.username
  }

  const result = getList (author, keyword)
  return result.then(listdata => {
      res.json(
        new SuccessModel(listdata)
      ) 
  }) 
});

router.get('/detail', function(req, res, next) {
  const result = getDetail(req.query.id)
  return result.then(data=>{
    res.json(new SuccessModel(data))
     
  })
  });
  
router.post('/new', loginCheck , (req, res, next)=> {
 
  req.body.author = req.session.username
  const result= newBlog(req.body)
  return result.then(data => {
    res.json(new SuccessModel(data))
     
  })   
})

router.post('/update', loginCheck , (req, res, next)=> {
 
  const result= updateBlog(req.query.id, req.body)
  return result.then(val => {
      if(val) {
        res.json(new SuccessModel())
         
      } else {
        res.json(new ErrorModel('更新博客失败'))
        
      }
  }) 
})

router.post('/del', loginCheck , (req, res, next)=> {
 
 
        const author = req.session.username
        const result= delBlog(req.query.id, author) 
        return result.then(data=> {
            if(data) {
              res.json(new SuccessModel())
                
            } else {
              res.json(new ErrorModel('删除博客失败'))
               
            }
        })
})


module.exports = router;
