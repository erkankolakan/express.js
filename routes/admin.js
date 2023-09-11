const express = require("express");
const router = express.Router();
const db = require("../data/db")


router.get( "/blog/create", async(req ,res) => {

    try {
        const [categories, ] = await db.query("select * from category") 

        res.render("admin/blog-create" , {
            title: "Yeni Blog Ekle",
            categories: categories,
        })
    } catch (error) {
        console.log(error);
    }
})


router.post("/blog/create" , async (req, res) => {
    const baslik = req.body.baslik;
    const aciklama = req.body.aciklama;
    const resim = req.body.resim;
    const kategori = req.body.kategori; 
    const anasayfa = req.body.anasayfa == "on" ? 1:0 ; 
    const onay = req.body.onay == "on" ? 1:0 ;

    try {
        await db.query("INSERT INTO blog(baslik,aciklama,resim,anasayfa,onay,categoryid) VALUES(?,?,?,?,?,?)", [baslik ,aciklama ,resim ,anasayfa ,onay, kategori  ] ) // Burada gelen 
        res.redirect("/admin/blogs");

    } catch (error) {
        console.log(error);
    }
})


router.get( "/blog/:blogid", async(req ,res) => { // admin/blog/:blogid blogların düzenleyeciğimiz sayfa

    const blogid = req.params.blogid //üsteki isim neyse biz onun yazıyoruz, PARAMS sayesinde bize bu bilgi gelmiş oluyor

    try {
        const [blogs,] = await db.query("select * from blog where blogid=?", [blogid]) //tüm blogları getir ama blogid değeri urlden gelen blogid değerine eşit olan blog bilgilerini getir diyoruz.
        const [categories,] = await db.query("select * from category") //kategori bilgileri için sayfamıza kategori bilgilerini gönderiyoruz 
        const blog = blogs[0] // column bilgileri işimize yaramadığı için yine onları elemnine ediyoruz

        if (blog) {
            return res.render("admin/blog-edit",{ //admin dosayası altından blog-edit sayfasına erişiyoruz
                title: blog.baslik,
                blog: blog,
                categories: categories
            })}
        res.redirect("admin/blogs") //kullanıcı gidip urldeki :blogid yerine sik sik şeyler yazarsa kullanıcıyı admin/blogs sayfasına atacak

    } catch (error) {
        console.log(error);
    }
}  )


router.get( "/blogs", async(req ,res) => {

    try {
        const [blogs, ] = await db.query("select blogid, baslik, resim from blog ") 
        res.render("admin/blog-list", {
            title: "Yeni Blog Ekle",
            blogs:blogs 
        })
    } catch (error) {
        console.log(error);
    }

}  )

module.exports = router

