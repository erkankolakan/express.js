const express = require("express");
const router = express.Router();

/*
router.use( "/blog/create", (req ,res, next) => {
    res.sendFile(path.join(__dirname, "../views/admin","blog-create.html"))
})

*/
// ejs kullanmadan önce html sayfalarımızı üsteki gibi routes ediyorduk, setFiles diyorduk ama artık öyle birşey yapmamıza gerek yok.
//-> Biz ejs yi app.js sayfasında çağırırken app.set("view engine","ejs") diyoruz yani sayfaların view klasörü içinde olduğunu söylüyoruz o yüzde burada sayfaları çağırıken view klasörü altında olduğunu söylememize gerek yok. sadece views altında kimi bulması gerektiğini söylememiz yeterli olacaktır. 

router.use( "/blog/create", (req ,res) => {
    res.render("admin/blog-create")
}  )

router.use( "/blog/:blogid", (req ,res) => {
    res.render("admin/blog-edit")
}  )

router.use( "/blogs", (req ,res) => {
    res.render("admin/blog-list")
}  )

module.exports = router