const router = require('koa-router')()
const Person = require('../dbs/models/person')
router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/addPerson',  async function(ctx){
  const person = new Person({
    name: ctx.request.body.name,
    age: ctx.request.body.age
  })
  let code
  try {
    await person.save()
    code =0
  } catch (error) {
    code = -1
  }
  ctx.body ={
    code:code
  }
  
})
router.post('/findPerson', async function (ctx){
 
  const rels =await Person.find({name:ctx.request.body.name})
  const rel =await Person.findOne({name:ctx.request.body.name})
  ctx.body ={
    code:0,
    rels,
    rel
  }
})
router.post('/updatePerson', async function(ctx){
  const rel = await Person.where({
    age:ctx.request.body.age
  }).update({
    name:ctx.request.body.name
  })
  ctx.body ={
    code:0
  }
})

router.post('/delPerson', async function(ctx){
  const rel = await Person.where({
    age:ctx.request.body.age
  }).remove()
  ctx.body ={
    code:0
  }
})

module.exports = router
