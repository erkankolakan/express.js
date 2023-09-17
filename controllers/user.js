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
    const size = 5 // sayfa başı gelecek ürün sayısı. 
    const { page = 0 } = req.query;   // ben urleye bir parametre ekleyerek page=x vererek hangi sayfada olduğunu alacağım. { page = 0 } diyerek req.query den gelen değer page ye set edilir ama kullanıcı bir değer girmediyse default olarak 0 değerni alır yani birinci sayfa değerini alır
    const slug = req.params.slug
    
    try{
        
        const blogs = await Blog.findAll({
            where:{ onay:{ [Op.eq]: true } },
            include: slug ? {model: Category , where:{ url:slug }} : null , //-> include demek kategori olduğu zaman gelecek demek. slug gelmemişse undefinedir, eğer slug gelmemişse undefined değildir bir değer vardır. 
            raw:true,
            // findAll biizm için bu özellikleri sağlıyor zaten.
            limit:size,  //-> gelecek olan ürün limiti 5 tane ürün gelecek.
        // offset:5 // -> offset:5 diyerek diğer 5 ürünü almasını söylüyorum.İlk beşi değil ikinci 5 i al demiş oluyoruz offset burada ötelemek demek. 
        
            offset: page * size //--->  0*5 => 0    1*5 => 5  (sonraki 5 taneyi all)

        })
        const categories = await Category.findAll({raw:true})

        res.render("users/blogs" , {
            title:"Tüm Kurslar",
            blogs:blogs, 
            categories: categories,
            secilenCategory:slug,
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


