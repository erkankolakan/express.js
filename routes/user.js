const express = require("express");
const router = express.Router();
const db = require("../data/db")


//en özel link en üstde bulur

router.use("/blogs/category/:categoryid" , async (req , res) => {
    const id = req.params.categoryid //burada yine gittiği id yi alıyoruz

    try {
        const [blogs, ] = await db.query("select * from blog where categoryid=?" , [id]) //burada gelen id ye göre blogları çekiyoruz
        const [categories, ] = await db.query("select * from category") 

        res.render("users/blogs" , {
            title:"Tüm Kurslar",
            blogs:blogs, 
            categories:categories,
            secilenCategory:id,
        })
        
    } catch (error) {
        console.log(error);
    }
})




router.use( "/blogs/:blogid", async(req ,res) => {

    const id = req.params.blogid 

    try {
        const [blog, ] = await db.query("select * from blog where blogid=?", [id])
      
        if (blog[0]) { 
            return res.render("users/blogDetails" , {
            title: blog[0].baslik,
            blog: blog[0], 
        })}
        res.redirect("/") 

    } catch (error) {
        console.log(error);
    }
})

router.use( "/blogs", async(req ,res) => {
    try{
        const [blogs, ] = await db.query("select * from blog where onay=1")
        const [categories, ] = await db.query("select * from category") 

        res.render("users/blogs" , {
            title:"Tüm Kurslar",
            blogs:blogs, 
            categories: categories,
            secilenCategory:null,
        })
    }

    catch(err){
        console.log(err);
    }
})

router.use( "/", async(req ,res) => {

    try{
        const [blogs, ] = await db.query("select * from blog where onay=1 and anasayfa=1")
        const [categories, ] = await db.query("select * from category")
        
        res.render("users/index" , {
            title:"Tüm Kurslar",
            blogs:blogs, 
            categories:categories,
            secilenCategory:null
        })
    }
    catch(err){
        console.log(err)
    }

}  )
module.exports= router
