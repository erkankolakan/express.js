const express = require("express");
const router = express.Router();

//controller

const userController = require("../controllers/user.js")


router.use("/blogs/category/:categoryid" , userController.bogs_by_category)  //controllerdeki fonksiyonu buraya çağırmış olduk

router.use( "/blogs/:blogid", userController.blogs_details)

router.use( "/blogs", userController.blog_list)

router.use( "/",  userController.index)

module.exports= router

