const Blog = require("../models/blog")
const Category = require("../models/category")
const fs = require("fs")


exports.get_blog_delete = async(req, res) =>{

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
}

exports.post_blog_delete = async (req,res) =>{
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

}

exports.get_category_delete = async(req, res) =>{

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
}

exports.post_category_delete = async (req,res) =>{
    const categoryid = req.body.categoryid;  
    try {

        await Category.destroy({
            where:{
                id:categoryid    
            }
        })
        res.redirect("/admin/categories?action=delete") 
        
    } catch (error) {
        console.log(error);
    }

}

exports.get_blog_create = async(req ,res) => {

    try {
        const categories = await Category.findAll()

        res.render("admin/blog-create" , {
            title: "Yeni Blog Ekle",
            categories: categories,
        })
    } catch (error) {
        console.log(error);
    }
}

exports.post_blog_create = async (req, res) => {
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
            categoryId:kategori
        }) 
        res.redirect("/admin/blogs?action=create"); 

    } catch (error) {
        console.log(error);
    }
}

exports.get_category_create = async(req ,res) => {

    try {
        res.render("admin/category-create" , {
            title: "Yeni Katagori Ekle",

        })
    } catch (error) {
        console.log(error);
    }
}

exports.post_category_create = async (req, res) => {
    const name = req.body.name;
    try {
        await Category.create({name: name})
        res.redirect("/admin/categories?action=create"); 

    } catch (error) {
        console.log(error);
    }
}

exports.get_blog_edit = async(req ,res) => { 

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
}  

exports.post_blog_edit = async(req ,res) => { 

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
                id : kategoriid
            })

            return res.redirect("/admin/blogs?action=edit&blogid=" + blogid) 

        }
        res.redirect("/admin/blogs") 

    } catch (error) {
        console.log(error);
    }

} 

exports.get_category_edit = async(req ,res) => { 

    const categoryid = req.params.categoryid 

    try {
        const category = await Category.findByPk(categoryid)
        const blogs = await category.getBlogs()
        const countBlog = await category.countBlogs() 

         if (category) {
            return res.render("admin/category-edit",{ 
                title: category.dataValues.name,
                category: category.dataValues,
                blogs: blogs,
                countBlog: countBlog
            })}
        res.redirect("admin/categories") 

    } catch (error) {
        console.log(error);
    }
}  

exports.post_category_edit = async(req ,res) => { 
    const categoryid = req.body.categoryid; 
    const name = req.body.name; 
    try {
            await Category.update({name : name} , {
                where: {
                    id: categoryid
                }
            });
            return res.redirect("/admin/categories?action=edit&categoryid=" + categoryid) 
    } catch (error) {
        console.log(error);
    }

}  

exports.get_blogs =  async(req ,res) => {


    try {
        const blogs = await Blog.findAll({   
            attributes:["id", "baslik", "altbaslik", "resim"],
            include: {
                model:Category
            }
        }) 

        res.render("admin/blog-list", {
            title: "Yeni Blog Ekle",
            blogs:blogs ,
            action: req.query.action,
            blogid: req.query.blogid
        })
    } catch (error) {
        console.log(error);
    }
}

exports.get_categories = async(req ,res) => {

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
}  