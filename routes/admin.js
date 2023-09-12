const express = require("express");
const router = express.Router();
const db = require("../data/db")
const imageUpload = require("../helpers/image-upload")
const fs = require("fs") //fs(file sistem) bir node.js modülüdür. 



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
        res.redirect("/admin/blogs?action=delete") 
        
    } catch (error) {
        console.log(error);
    }

})


router.get("/categories/delete/:categoryid", async(req, res) =>{

    const categoryid = req.params.categoryid

    try {
        const [categories, ] = await db.query("select * from category where category_id=?", [categoryid])
        const category = categories[0];

        res.render("admin/category-delete",{
            title:"category sileme işlemleri",
            category:category,
        })

    } catch (error) {
        console.log(error);
    }
})

router.post("/categories/delete/:categoryid" , async (req,res) =>{
    const categoryid = req.body.categoryid;  
    
    try {
        await db.query("DELETE from category where category_id=?" , [categoryid])
        res.redirect("/admin/categories?action=delete") 
        
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



router.post("/blog/create", imageUpload.upload.single("resim") , async (req, res) => {
    const baslik = req.body.baslik;
    const altbaslik = req.body.altbaslik; // altbaslik divleri eklediğimiz için burada onuda eklememiz gerekir. Tabi aşağıdakilerde de günceleme yap
    const aciklama = req.body.aciklama;
    const resim = req.file.filename; 
    const kategori = req.body.kategori; 
    const anasayfa = req.body.anasayfa == "on" ? 1:0 ; 
    const onay = req.body.onay == "on" ? 1:0 ;


    try {
        console.log(resim)
        await db.query("INSERT INTO blog(baslik,altbaslik,aciklama,resim,anasayfa,onay,categoryid) VALUES(?,?,?,?,?,?,?)", [baslik,altbaslik ,aciklama ,resim ,anasayfa ,onay, kategori  ] ) 
        res.redirect("/admin/blogs?action=create"); 

    } catch (error) {
        console.log(error);
    }
})

router.get( "/category/create", async(req ,res) => {

    try {
        res.render("admin/category-create" , {
            title: "Yeni Katagori Ekle",

        })
    } catch (error) {
        console.log(error);
    }
})

router.post("/category/create" , async (req, res) => {
    const name = req.body.name;
    try {
        await db.query("INSERT INTO category(name) VALUES(?)", [name]) 
        res.redirect("/admin/categories?action=create"); 

    } catch (error) {
        console.log(error);
    }
})

router.get( "/blog/:blogid",  async(req ,res) => { 

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


router.post( "/blog/:blogid", imageUpload.upload.single("resim") , async(req ,res) => { 
    const blogid = req.body.blogid;
    const altbaslik = req.body.altbaslik;
    const baslik = req.body.baslik; 
    const aciklama = req.body.aciklama; 
    let resim = req.body.resim;

    if (req.file) {
        resim = req.file.filename;

        fs.unlink("./public/images/" + req.body.resim, err => { 
            console.log(err); 
        })
    }

    const anasayfa = req.body.anasayfa == "on" ? "1" : "0" ; 
    const onay = req.body.onay == "on" ? "1" : "0" ; 
    const kategoriid = req.body.kategori; 
    console.log(req.body)

    try {
        await db.query("UPDATE blog SET baslik = ?,altbaslik = ? ,aciklama = ?, resim = ?, anasayfa = ?, onay = ?, categoryid = ? WHERE blogid = ?", [baslik, altbaslik ,aciklama, resim, anasayfa, onay, kategoriid, blogid]);

        res.redirect("/admin/blogs?action=edit&blogid=" + blogid) 
    } catch (error) {
        console.log(error);
    }

}  )

//categories

router.get( "/categories/:categoryid", async(req ,res) => { 

    const categoryid = req.params.categoryid 

    try {
        const [categories,] = await db.query("select * from category where category_id=?", [categoryid])  
        const category = categories[0] 

        if (category) {
            return res.render("admin/category-edit",{ 
                title: category.name,
                category: category
            })}
        res.redirect("admin/categories") 

    } catch (error) {
        console.log(error);
    }
}  )


router.post( "/categories/:categoryid", async(req ,res) => { 
    const categoryid = req.body.categoryid; 
    const name = req.body.name; 


    try {
        await db.query("UPDATE category SET name = ? WHERE category_id = ?", [name, categoryid]); 
        res.redirect("/admin/categories?action=edit&categoryid=" + categoryid) 

    } catch (error) {
        console.log(error);
    }

}  )

router.get( "/blogs", async(req ,res) => {

    try {
        const [blogs, ] = await db.query("select blogid, baslik, altbaslik, resim from blog")
        res.render("admin/blog-list", {
            title: "Yeni Blog Ekle",
            blogs:blogs ,
            action: req.query.action,
            blogid:req.query.blogid
        })
    } catch (error) {
        console.log(error);
    }
})

router.get( "/categories", async(req ,res) => {

    try {
        const [categories, ] = await db.query("select * from category")
        res.render("admin/category-list", {
            title: "Yeni Blog Ekle",
            categories:categories ,
            action: req.query.action,
            categoryid: req.query.categoryid 
        })
    } catch (error) {
        console.log(error);
    }
})






















module.exports = router

