/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/users', controllers.user)//validationMiddleware, 

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)

router.get('/test', (ctx) => {
  ctx.state.data = { ok: true };
});

// test
router.get('/dishes',controllers.dishes)

router.get('/images/recommendation',controllers.images)

router.post('/orders', controllers.insertItems)
const sendRequest = require('../tools/sendRequest')
router.get('/orders', sendRequest.sendRequest)

router.post('/users/signin',controllers.getUserid)
const sendCode = require('../tools/sendCode')
router.get('/users/signin',sendCode.sendCode)

//API 2.1
router.get('/tables/:table_id',controllers.queryTable)

router.post('/tables/:table_id/together', controllers.orderTogether)
const oTtrigger = require('../tools/orderTogetherTrigger')
router.get('/tables/:table_id/together', oTtrigger.trigger)

// API 2.2
router.post('/tables/:table_id/dishes', controllers.updateDish)
const updateDishTrigger = require('../tools/updateDishTrigger')
router.get('/tables/:table_id/dishes', updateDishTrigger) //controllers.queryOrders

// API 2.4
router.post('/orders/together', controllers.commitOrders)
const commitTrigger = require('../tools/commitTrigger')
router.get('/orders/together', commitTrigger)
module.exports = router
