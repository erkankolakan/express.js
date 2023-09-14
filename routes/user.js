const express = require("express");
const router = express.Router();

const Blog = require("../models/blog") 
const Category = require("../models/category")
const {Op} = require("sequelize") 


router.use("/blogs/category/:categoryid" , async (req , res) => {
    const id = req.params.categoryid 

    try {

        const blogs = await Blog.findAll({
            where:{
                categoryid:id,
                onay:true
            },
            raw:true 
        })
        const categories = await Category.findAll({raw:true})

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
        const blog = await Blog.findByPk(id)  
      
        if (blog) { 
            return res.render("users/blogDetails" , {
            title: blog.baslik,
            blog: blog, 
        })}
        res.redirect("/") 

    } catch (error) {
        console.log(error);
    }
})

router.use( "/blogs", async(req ,res) => {
    try{
        
        const blogs = await Blog.findAll({
            where:{
                onay:{
                    [Op.eq]: true 
                }
            },
            raw:true 
        })
        const categories = await Category.findAll({raw:true})

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

//yukarıda const {Op} = requir("sequelize") dedikten sonra operatorleri kullabiliriz

    try{
        
        const blogs = await Blog.findAll({
            where: {
                [Op.and]: [
                { anasayfa:true },
                { onay:true }
            ]},
            raw:true
        })
        const categories = await Category.findAll({raw: true}) //raw true dediğimiz zaman extra gelen saçma bilgiler gelmez.


        
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

