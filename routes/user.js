const express = require("express");
const router = express.Router();

//controller

const userController = require("../controllers/user.js")


router.use("/blogs/category/:slug" , userController.bogs_by_category)  //controllerdeki fonksiyonu buraya çağırmış olduk

router.use( "/blogs/:slug", userController.blogs_details)

router.use( "/blogs", userController.blog_list)

router.use( "/",  userController.index)

module.exports= router

/*
önceden 

router.use( "/blogs/:blogid", userController.blogs_details)  //bu şekilde :blogid alıyorduk artık slug alıcağız
 
router.use( "/blogs/:blogid", userController.blogs_details)

*/ 