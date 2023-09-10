const express = require("express");
const router = express.Router();
const db = require("../data/db") //burada data da çekmiş olduğumuz servera erişiyoruz

router.use( "/blog/create", async(req ,res) => {

    try {
/* bize gelen veride ilk değer veri ile alakalı diğer ikinci değer ise kolon bilgileri bizim şuan kolon bilgileri ile işimiz yok o yüzden bizde ilk değerleri alabilek adına [ xxxxxxx ,] şekliden yazıyoruz */
        const [categories, ] = await db.query("select * from category") //kategori tablosunda ki tüm verileri getir
        res.render("admin/blog-create" , {
            title: "Yeni Blog Ekle",
            categories: categories,  //üste almış olduğumuz veriyi sayfaya gönderiyoruz, blog-create sayfasında da categories ismiyle verileri karşılayacağız.
        })
    } catch (error) {
        console.log(error);
    }
}  )

router.use( "/blog/:blogid", (req ,res) => {
    res.render("admin/blog-edit")
}  )
  
router.use( "/blogs", (req ,res) => {
    res.render("admin/blog-list")
}  )

module.exports = router