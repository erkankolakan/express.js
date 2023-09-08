const path = require("path")
const express = require("express");
const router = express.Router();



router.use( "/blog/create", (req ,res, next) => {
    res.sendFile(path.join(__dirname, "../views/admin","blog-create.html"))
}  )

router.use( "/blog/:blogid", (req ,res, next) => {
    res.sendFile(path.join(__dirname, "../views/admin","blog-edit.html"))
}  )

router.use( "/blogs", (req ,res, next) => {
    res.sendFile(path.join(__dirname, "../views/admin","blog-list.html"))
}  )

/*
biz burada tek tek linklerken hepsini başına admin yazmaktansa middleware olarak çağırdığımız burayı middleware de addmin olarak belirtmemiz yeterli olacaktır. 
*/







module.exports = router