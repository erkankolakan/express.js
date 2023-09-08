//burası kullanıcı sayfaları. 
const path = require("path")
const express = require("express");
const router = express.Router();
//Artık routerleri direk middleware olarak app.js içerisine eklemek yerine bunları kendi içerisinde kapsam içerisine alacağız ve bu kapsamı dışarıya açacağız export etmiş olduğumuz burdaki routerler ise ana uygulama içerisinde bir middleware olarak eklemiş olacağız. 



router.use( "/blogs/:blogid", (req ,res) => {
    res.render("users/blogDetails")
}  )


router.use( "/blogs", (req ,res) => {
    res.render("users/blogs")
}  )

router.use( "/", (req ,res) => {
    res.render("users/index")
}  )

module.exports= router