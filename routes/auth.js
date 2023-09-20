const express = require("express")
const router = express.Router()

const authController = require("../controllers/auth")
const csurf = require("../middlewares/csurf")


router.get("/register" ,  authController.get_register)

router.post("/register" , authController.post_register)

router.get("/login" ,  authController.get_login)

router.post("/login" , authController.post_login)

router.get("/logout" ,  authController.get_logout)

/*
    Fark ettiysek sadece GET işelemlerine bu TOKENİ verdik çünkü biz formu getirirken token geliyor. post ederken zaten bize gelen tokeni gönderiyoruz.
*/

module.exports = router