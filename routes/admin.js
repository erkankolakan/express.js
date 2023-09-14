const express = require("express");
const router = express.Router();
const imageUpload = require("../helpers/image-upload")
const fs = require("fs") 

const Blog = require("../models/blog") 
const Category = require("../models/category")//oluşturmuş olduğumuz databaseleri buraya çağırıyoruz.

router.get("/blog/delete/:blogid", async(req, res) =>{

    const blogid = req.params.blogid

    try {
        const blog = await Blog.findByPk(blogid)

        if (blog) {
            res.render("admin/blog-delete",{
            title:"blog sileme işlemleri",
            blog:blog,
        })
    }
        res.redirect("admin/blogs")

      

    } catch (error) {
        console.log(error);
    }
})

router.post("/blog/delete/:blogid" , async (req,res) =>{
    const blogid = req.body.blogid; 
    
    try {
        const blog = await Blog.findByPk(blogid)

        if (blog) {                                        //---> bir blog değeri gelirse destroy() diyerek sileceğiz
            await blog.destroy();
            return res.redirect("/admin/blogs?action=delete") 
        }
            res.redirect("/admin/blogs") 

        
    } catch (error) {
        console.log(error);
    }

})

router.get("/categories/delete/:categoryid", async(req, res) =>{

    const categoryid = req.params.categoryid

    try {
        const category = await Category.findByPk(categoryid)

        if (category) {
            res.render("admin/category-delete",{
            title:"category sileme işlemleri",
            category:category,
        })
        }



    } catch (error) {
        console.log(error);
    }
})

router.post("/categories/delete/:categoryid" , async (req,res) =>{
    const categoryid = req.body.categoryid;  
    try {

        await Category.destroy({
            where:{
                category_id:categoryid      //--->>> category tablosu üzerinde category_id değeri categoryid ye eşit olan kaydı sil demiş oluyoruz
            }
        })
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

    try {

        const blog = await Blog.findByPk(blogid)

        if(blog){ // eğer bir blog a eriştiysek

            blog.update({
                altbaslik : altbaslik,
                baslik : baslik,
                aciklama : aciklama,
                resim : resim,
                anasayfa : anasayfa,
                onay : onay,
                category_id : kategoriid
            })

            return res.redirect("/admin/blogs?action=edit&blogid=" + blogid) 

        }
        res.redirect("/admin/blogs") 

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
            await Category.update({name : name} , {
                where: {
                    category_id: categoryid
                }
            });
            return res.redirect("/admin/categories?action=edit&categoryid=" + categoryid) 
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
ONCESİ
        await db.query("DELETE from blog where blogid=?" , [blogid])


SONRASI

        const blog = await Blog.findByPk(blogid)

        if (blog) {                                        //---> bir blog değeri gelirse destroy() diyerek sileceğiz
            await blog.destroy();
            return res.redirect("/admin/blogs?action=delete") 
        }

VERİ TABANINDAN HERŞEYİ SİLMEK İSTİYORSAK

await. xxx.destroy({          //->>> tablo üzerindeki tüm verileri silmiş oluruz.
    truncate: ture
})



    ONCESİ
    await db.query("DELETE from category where category_id=?" , [categoryid])

    SONRASI

    await Category.destroy({
        where:{
            categoryid:categoryid //--->>> bu şekilde where sorgusu ile de silme işlemi yapabiliriz yapılabilir
        }
    })


        
*/



