const express = require("express");
const router = express.Router();
const db = require("../data/db")
const imageUpload = require("../helpers/image-upload")
const fs = require("fs") 

const Blog = require("../models/blog") 
const Category = require("../models/category")//oluşturmuş olduğumuz databaseleri buraya çağırıyoruz.



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
        const categories = await Category.findAll()

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
    const altbaslik = req.body.altbaslik;
    const aciklama = req.body.aciklama;
    const resim = req.file.filename; 
    const kategori = req.body.kategori; 
    const anasayfa = req.body.anasayfa == "on" ? 1:0 ; 
    const onay = req.body.onay == "on" ? 1:0 ;

    try {
        console.log(resim)
        await Blog.create({
            baslik:baslik,
            altbaslik:altbaslik,
            aciklama:aciklama,
            resim:resim,
            anasayfa:anasayfa,
            onay:onay,
            categoryid:kategori
        }) 
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
        await Category.create({name: name})
        res.redirect("/admin/categories?action=create"); 

    } catch (error) {
        console.log(error);
    }
})

router.get( "/blog/:blogid",  async(req ,res) => { 

    const blogid = req.params.blogid 

    try {

        const blog = await Blog.findByPk(blogid)

        const categories = await Category.findAll()

        if (blog) {
             res.render("admin/blog-edit",{ 
                title: blog.dataValues.baslik,
                blog: blog.dataValues,
                categories: categories,
                
                
            }
            
            )
        }


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

router.get( "/categories/:categoryid", async(req ,res) => { 

    const categoryid = req.params.categoryid 

    try {



        const category = await Category.findByPk(categoryid)
//findByPk kullanarak direk pk e göre çekebiliriz. Kolon bilgisini eler ama yine dataValues üzerinden bilgiyi çekmen gerek

        if (category) {
            return res.render("admin/category-edit",{ 
                title: category.dataValues.name,
                category: category.dataValues
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
        const blogs = await Blog.findAll({
            attributes:["blogid", "baslik", "altbaslik", "resim"]
        }) //Blog tablesinden blogid baslik altbaslik, resim bilgileri gelsin. 

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
        const categories = await Category.findAll()

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

/*

findAll() -> bize bir liste döndürür bu liste içerisinde işimize yaramayacak olan tablo bilgileri de gelir bunun içinden sıyrılmak için yine [categoryies, ] fln yapabilir ama sequelize bize daha iyi şeyler sunar.

findByPk() -> primary keyine göre istediğimiz veriyi çekebilir ve bu çektiğimiz veri geriye bir obje döndürür. findNyPk(2) dersek id değeri 2 olan değeri getirir Buda bize direk dataValues ile direk istediğimiz veriye ulaşmamızı sağlar.

findOne() -> değerine göre istediğimiz veriyi çekebilir ve bu çektiğimiz veri geriye bir obje döndürür.



/*

ÖNCESİ
// const [categories,] = await db.query("select * from category where category_id=?", [categoryid])  

SONRASI
    const category = await Category.findAll({ //tüm verileri çekerken sorgu yapar
        where:{
            category_id:categoryid
        //burada kriterleri belirliyorsunuz
        //Category tablosundaki categoryid değerinin yukarıdan gelen categoryid değerine eşit olması gerektiğini söylüyoruz.
        }
    })

veya

    const category = await Category.findOne({ //sadece birtane veri çekmeye yöneliktir
        where:{
            category_id:categoryid
        //burada kriterleri belirliyorsunuz
        //Category tablosundaki categoryid değerinin yukarıdan gelen categoryid değerine eşit olması gerektiğini söylüyoruz.
        }
    })

veya

    const categoryid = req.params.categoryid  -> //pk ya göre veri çeker ------- categoryid = primary key dir 

    const category = await Category.findByPk(categoryid)

ÖNCESİ
        const [blogs,] = await db.query("select * from blog where blogid=?", [blogid]) 


SONRASI
        const blogs = Blog.findByPk(blogid)


*/



