const express = require("express");
const router = express.Router();
const imageUpload = require("../helpers/image-upload")
const adminController = require("../controllers/admin")
const csurf = require("../middlewares/csurf")

const isAuth = require("../middlewares/auth")


router.get("/blog/delete/:blogid" ,isAuth ,  adminController.get_blog_delete)

router.post("/blog/delete/:blogid", isAuth , adminController.post_blog_delete)

router.get("/categories/delete/:categoryid" ,  isAuth ,  adminController.get_category_delete)

router.post("/categories/delete/:categoryid", isAuth , adminController.post_category_delete)

router.get( "/blog/create" , isAuth ,  adminController.get_blog_create)

router.post("/blog/create", isAuth , imageUpload.upload.single("resim") , adminController.post_blog_create)

router.get( "/category/create" , isAuth ,   adminController.get_category_create)

router.post("/category/create" , isAuth , adminController.post_category_create)

router.get( "/blog/:blogid" , isAuth ,  adminController.get_blog_edit)

router.post( "/blog/:blogid", isAuth , imageUpload.upload.single("resim") , adminController.post_blog_edit )

router.post("/categories/remove", isAuth , adminController.get_category_remove)  

router.get( "/categories/:categoryid" , isAuth ,  adminController.get_category_edit)

router.post( "/categories/:categoryid", isAuth , adminController.post_category_edit)

router.get( "/blogs", isAuth ,adminController.get_blogs)

router.get( "/categories", isAuth , adminController.get_categories)

router.get("/roles"  , isAuth ,  adminController.get_roles)  //->

router.get("/roles/:roleid" , isAuth , adminController.get_role_edit) //->

router.post("/roles/remove" , isAuth  , adminController.roles_remove) //-> burada hiyerarşı oldukça önemlidir. Biz /roles/:roleid bundan önce yazmış olsaydık sayı karşıladığı için direk oraya gidecekti ve katagoriden çıkarma işlemi yapılamayacakto !!!

router.post("/roles/:roleid" , isAuth , adminController.post_role_edit) //->



module.exports = router

  

