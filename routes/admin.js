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
        await db.query("INSERT INTO blog(baslik,aciklama,resim,anasayfa,onay,categoryid) VALUES(?,?,?,?,?,?)", [baslik ,aciklama ,resim ,anasayfa ,onay, kategori  ] ) 
        res.redirect("/admin/blogs");

    } catch (error) {
        console.log(error);
    }
})



router.get( "/blog/:blogid", async(req ,res) => { 

    const blogid = req.params.blogid 

    try {
        const [blogs,] = await db.query("select * from blog where blogid=?", [blogid]) 
        const [categories,] = await db.query("select * from category") 
        const blog = blogs[0] 

        if (blog) {
            return res.render("admin/blog-edit",{ 
                title: blog.baslik,
                blog: blog,
                categories: categories
            })}
        res.redirect("admin/blogs") 

    } catch (error) {
        console.log(error);
    }
}  )

// BLOGLARIMIZI GÜNCELLİYELİM güncelleme işlemleri de POST ile olur onun içib bizim post router middleware sine ihtiyacımız var. 

router.post( "/blog/:blogid", async(req ,res) => { 
    const blogid = req.body.blogid; //biz neden burada params ile güncelleyeceğimiz id değerini almadık ? -> çünkü kullanıcı gidip url den :blogid değerini değiştirirse kullanıcın güncellemek istediği yazılar url de yazmış olduğu id değerindeki data verilerini güncellemiş olur.  O yüzden gelen requesten bu id değerini almak daha mantıklı. Zatan blogid category id ile eşleştiği zaman gidip o veriyi güncelleyecek.
    const baslik = req.body.baslik; //req.body post tarafından gelen tüm form bilgilerini bize verir
    const aciklama = req.body.aciklama; //req.body.aciklama formda name değeri aciklama olan inputun veya artık hangi form değeriyse onun değerini döndürür. 
    const resim = req.body.resim; 
    const anasayfa = req.body.anasayfa == "on" ? "1" : "0" ; //check boxlar on of değeri döndürür biz on gelirse yap dedik yani birnevi true yap demiş olduk.
    const onay = req.body.onay == "on" ? "1" : "0" ; 
    const kategoriid = req.body.kategori; //id bilgisini getiricek
    console.log(req.body)

    try {
//aslında güncelleme kodunun okunuşu sen blogu baslik , aciklmama ... bilgilerini güncelle ve set le yani gönder demiş oluyoruz.
        await db.query("UPDATE blog SET baslik = ?, aciklama = ?, resim = ?, anasayfa = ?, onay = ?, categoryid = ? WHERE blogid = ?", [baslik, aciklama, resim, anasayfa, onay, kategoriid, blogid]);
//nedne where diyoruz çünkü biz bize serverden gelen where değeri  blogid = req.body.blogid den gelen değere eşit olan blogun gelmesini istiyoruz
        res.redirect("/admin/blogs")
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

