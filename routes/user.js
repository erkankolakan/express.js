const express = require("express");
const router = express.Router();

//controller

const userController = require("../controllers/user.js")


router.get("/blogs/category/:slug" , userController.blog_list)  //controllerdeki fonksiyonu buraya çağırmış olduk

router.get( "/blogs/:slug", userController.blogs_details)

router.get( "/blogs", userController.blog_list)

router.get( "/",  userController.index)

module.exports= router

/*
önceden 

router.use( "/blogs/:blogid", userController.blogs_details)  //bu şekilde :blogid alıyorduk artık slug alıcağız
 
router.use( "/blogs/:blogid", userController.blogs_details)

*/ 