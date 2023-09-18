//user ile alakalı tüm yönlendirme fonksiyonları bu sayfaya yazalım. 

const Blog = require("../models/blog") 
const Category = require("../models/category")
const {Op} = require("sequelize")  


exports.blogs_details = async(req ,res) => {

    const slug = req.params.slug 

    try {
        const blog = await Blog.findOne({
            where:{
                url:slug
            }
        })  
      
        if (blog) { 
            return res.render("users/blogDetails" , {
            title: blog.baslik,
            blog: blog, 
        })}
        res.redirect("/") 

    } catch (error) {
        console.log(error);
    }
}

exports.blog_list = async(req ,res) => {
    const size = 5 
    const { page = 0 } = req.query;   
    const slug = req.params.slug
    
    try{
        
        const { rows , count } = await Blog.findAndCountAll({
            where:{ onay:{ [Op.eq]: true } },
            include: slug ? {model: Category , where:{ url:slug }} : null , 
            raw:true,
            limit:size,  
            offset: page * size 
        })
        const categories = await Category.findAll({raw:true})

        res.render("users/blogs" , {
            title:"Tüm Kurslar",
            blogs:rows, 
            totalItems: count,
            totalPages: Math.ceil(count / size), 
            currentPage: page,
            categories: categories,
            secilenCategory:slug,
        })
    }

    catch(err){
        console.log(err);
    }
}


exports.index = async(req ,res) => {

    
        try{
            
            const blogs = await Blog.findAll({
                where: {
                    [Op.and]: [
                    { anasayfa:true },
                    { onay:true }
                ]},
                raw:true
            })
            const categories = await Category.findAll({raw: true})
    
    
            
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
    
} 



