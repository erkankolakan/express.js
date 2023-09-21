const express = require("express");
const router = express.Router();
const imageUpload = require("../helpers/image-upload")
const adminController = require("../controllers/admin")
const csurf = require("../middlewares/csurf")
const isAdmin = require("../middlewares/is-admin");
const isModerator = require("../middlewares/is-moderator");


router.get("/blog/delete/:blogid" , isModerator ,  adminController.get_blog_delete)

router.post("/blog/delete/:blogid" , isModerator , adminController.post_blog_delete)

router.get("/categories/delete/:categoryid" , isAdmin ,  adminController.get_category_delete)

router.post("/categories/delete/:categoryid" , isAdmin , adminController.post_category_delete)

router.get( "/blog/create"  , isModerator ,  adminController.get_blog_create)

router.post("/blog/create" , isModerator , imageUpload.upload.single("resim") , adminController.post_blog_create)

router.get( "/category/create"  , isAdmin ,   adminController.get_category_create)

router.post("/category/create"  , isAdmin , adminController.post_category_create)

router.get( "/blog/:blogid"  , isModerator ,  adminController.get_blog_edit)

router.post( "/blog/:blogid" , isModerator , imageUpload.upload.single("resim") , adminController.post_blog_edit )

router.post("/categories/remove" , isAdmin , adminController.get_category_remove)  

router.get( "/categories/:categoryid"  , isAdmin ,  adminController.get_category_edit)

router.post( "/categories/:categoryid" , isAdmin , adminController.post_category_edit)

router.get( "/blogs" , isModerator ,adminController.get_blogs)

router.get( "/categories" , isAdmin , adminController.get_categories)

router.get("/roles"   , isAdmin ,  adminController.get_roles)  

router.get("/roles/:roleid"  , isAdmin , adminController.get_role_edit) 

router.post("/roles/remove"  , isAdmin  , adminController.roles_remove) //-> burada hiyerarşı oldukça önemlidir. Biz /roles/:roleid bundan önce yazmış olsaydık sayı karşıladığı için direk oraya gidecekti ve katagoriden çıkarma işlemi yapılamayacakto !!!

router.post("/roles/:roleid"  , isAdmin , adminController.post_role_edit) 

router.get("/users"  , isAdmin , adminController.get_user)

router.get("/users/:userid"  , isAdmin , adminController.get_user_edit)

router.post("/users/:userid"  , isAdmin , adminController.post_user_edit)

module.exports = router

  

