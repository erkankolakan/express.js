//user ile alakalı tüm yönlendirme fonksiyonları bu sayfaya yazalım. 

const Blog = require("../models/blog") 
const Category = require("../models/category")
const {Op} = require("sequelize")  


exports.bogs_by_category = async (req , res) => {     //fonksiyonları dışarıya açmayı untutmamak gerek bu kısımda module.exports demeye gerek yok
    const id = req.params.categoryid 

    try {

        const blogs = await Blog.findAll({
            where:{
                categoryId:id,
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
}

exports.blogs_details = async(req ,res) => {

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
}


exports.blog_list = async(req ,res) => {
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
}


exports.index = async(req ,res) => {

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
    
} 



/*
    CONTROLLER
controller mantığı aslında mvc(model) denen mantık var ki biz zaten model mantığını öğrendik. views bizim için ejs sayfalarıdır yani görüntü oluşturacak.
controller ise bizim için süreci yürütecek olan örneğin veri tabanına bağlanıp buradan bilgileri alıp ki bu bilgileri de belirli nesneler aracılığla  model içine doldurarak bunu sayfa üzerinde viewlere göndererek bir görüntü oluşturuyoruz. 
Biz aslında routes klasörü oluşturduk ve router içinde istekler geliyor ve bu istekler sonucunda bir fonksiyon döndürüyoruz. Bizim aslında bu fonksiyonları controller içinde tutmamız gerekir.

*/