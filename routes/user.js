const express = require("express");
const router = express.Router();

//controller

const userController = require("../controllers/user.js")


router.get("/blogs/category/:slug" , userController.blog_list)  

router.get( "/blogs/:slug", userController.blogs_details)

router.get( "/blogs", userController.blog_list)

router.get( "/",  userController.index)

module.exports= router

