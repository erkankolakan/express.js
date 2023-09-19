const express = require("express");
const router = express.Router();

//controller

const userController = require("../controllers/user.js")
const isAuth = require("../middlewares/auth")



router.get("/blogs/category/:slug", isAuth , userController.blog_list)  

router.get( "/blogs/:slug", isAuth , userController.blogs_details)

router.get( "/blogs",  userController.blog_list)

router.get( "/", userController.index)

module.exports= router

