const express = require("express")
const router = express.Router()

const authController = require("../controllers/auth")
const csurf = require("../middlewares/csurf")


router.get("/register" ,  authController.get_register)
router.post("/register" , authController.post_register)

router.get("/login" ,  authController.get_login)
router.post("/login" , authController.post_login)

router.get("/reset-password" ,  authController.get_reset)
router.post("/reset-password" , authController.post_reset)

//mail adresimize bir token bilgisi talep ettik ve email adresimize gelen adrese tıkladığımız zaman kullanıcının karşısına da bir sayfa ör/new-password diye bir sayfa getireceğiz.

router.get("/new-password/:token" ,  authController.get_newpassword) //newpassword için bir token bilgisi tanımlayalım 
router.post("/new-password" , authController.post_newpassword)

router.get("/logout" ,  authController.get_logout)

module.exports = router