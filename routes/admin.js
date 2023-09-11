const express = require("express");
const router = express.Router();
const db = require("../data/db")

router.get("/blog/delete/:blogid", async(req, res) =>{

    const blogid = req.params.blogid

    try {
        const [blogs, ] = await db.query("select * from blog where blogid=?", [blogid])
        const blog = blogs[0];

        res.render("admin/blog-delete",{
            title:"blog sileme işlemleri",
            blog:blog
        })


    } catch (error) {
        console.log(error);
    }
})

router.post("/blog/delete/:blogid" , async (req,res) =>{
    const blogid = req.body.blogid; //yine tıkladığımız blog html tarafında gizli bir input sayesinde blogid değerini alır ver 
    
    try {
        await db.query("DELETE from blog where blogid=?" , [blogid]) //sadece DELETE from blog yazarsak tüm blogları silmiş olur. 
//biz datandan gelen blogid değeri kime eşit olan değeri almak istiyoruz üsttden gelen blogid=req.body.blogid değerine eşit olan değeri almak istiyoruz
        res.redirect("/admin/blogs")
        
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

