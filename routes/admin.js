const express = require("express");
const router = express.Router();
const db = require("../data/db")

// QueryString -> Bir blog değerini güncellediğimiz zaman kullanıcıyı direk blogs sayfasına atıyoruz karşımıza liste geliyor ama biz kullanıcıya ürün başarılı bir şekilde güncellendi veya blog başarılı bir şekilde silindi demek isitorsak biz bunlar QueryString ile yapıyoruz. QueryString, bir URL (Uniform Resource Locator) içindeki veri ve parametreleri temsil eden bir dizedir. Genellikle bir web sayfasına veya uygulamasına veri göndermek veya belirli bir sayfada görüntülenen içeriği filtrelemek için kullanılır. QueryString, anahtar-değer çiftlerinden oluşur, bu çiftler "=" işareti ile ayrılır ve "&" işareti ile birbirinden ayrılır.

router.get("/blog/delete/:blogid", async(req, res) =>{

    const blogid = req.params.blogid

    try {
        const [blogs, ] = await db.query("select * from blog where blogid=?", [blogid])
        const blog = blogs[0];

        res.render("admin/blog-delete",{
            title:"blog sileme işlemleri",
            blog:blog,
        })

    } catch (error) {
        console.log(error);
    }
})

router.post("/blog/delete/:blogid" , async (req,res) =>{
    const blogid = req.body.blogid; 
    
    try {
        await db.query("DELETE from blog where blogid=?" , [blogid])
        res.redirect("/admin/blogs?action=delete") //Bir görevi nerede bitiyoruz diye bakıyoruz. Burada bir ürünü siliyoruz yaptığımız işlem ne görev=delete silme işlemi yaptık. 
        
    } catch (error) {
        console.log(error);
    }

})



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
        res.redirect("/admin/blogs?action=create"); //ne yaptık blog oluşturduk ? oldukça büyük bir etkendir

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


router.post( "/blog/:blogid", async(req ,res) => { 
    const blogid = req.body.blogid;
    const baslik = req.body.baslik; 
    const aciklama = req.body.aciklama; 
    const resim = req.body.resim; 
    const anasayfa = req.body.anasayfa == "on" ? "1" : "0" ; 
    const onay = req.body.onay == "on" ? "1" : "0" ; 
    const kategoriid = req.body.kategori; 
    console.log(req.body)

    try {
        await db.query("UPDATE blog SET baslik = ?, aciklama = ?, resim = ?, anasayfa = ?, onay = ?, categoryid = ? WHERE blogid = ?", [baslik, aciklama, resim, anasayfa, onay, kategoriid, blogid]);

        res.redirect("/admin/blogs?action=edit&blogid=" + blogid) //ne yaptık bir öğe editledik
    } catch (error) {
        console.log(error);
    }

}  )

router.get( "/blogs", async(req ,res) => {

    try {
        const [blogs, ] = await db.query("select blogid, baslik, resim from blog ") 
        res.render("admin/blog-list", {
            title: "Yeni Blog Ekle",
            blogs:blogs ,
            action: req.query.action, //bize url den geleen queryString key değeri xxx ise biz req.query.xxx yazark url den gelen bilgiyi çekebiliriz.
            blogid:req.query.blogid
        })
    } catch (error) {
        console.log(error);
    }
})


//Bu sayfada post requestleri sonucunda en nihayetinde admin/blogsu çalıştırıyoruz dolayısıyla admin/blogs çalıştığı zaman gele requestde url bize bu /admin/blogs?action=edit bilgiyi getiricek bizde admin/blogs sayfasında bunu karşılayarak html sayfama göndereceğim. 

module.exports = router

