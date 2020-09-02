const router=require("express").Router()
const adminCltr=require("../app/controllers/AdminController")
const authUser=require("../app/middlewares/authUser")
router.post('/api/admin/register',adminCltr.register)
router.get('/api/admin/login',adminCltr.login)
router.get('/api/admin/account',authUser,adminCltr.account)
module.exports=router
