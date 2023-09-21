const Blog = require("../models/blog")
const Category = require("../models/category")
const Role = require("../models/role")
const User = require("../models/user")
const fs = require("fs")
const {Op} = require("sequelize")  
const sequelize = require("../data/db")

const slugField = require("../helpers/slugfield")


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
    const anasayfa = req.body.anasayfa == "on" ? 1:0 ; 
    const onay = req.body.onay == "on" ? 1:0 ;

    try {
        console.log(resim)
        await Blog.create({
            baslik:baslik,
            altbaslik:altbaslik,
            url: slugField(baslik), //bu sayede gelen baslık değeri slugField içerisinden geçerek bir url olarak veri tabanında url satırana kaydolur
            aciklama:aciklama,
            resim:resim,
            anasayfa:anasayfa,
            onay:onay
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

        const blog = await Blog.findOne({
            where:{
                id : blogid            
            },
            include:{
                model:Category,
                attributes:["id"] 
            }
        })

        const categories = await Category.findAll() //burada da veri tabanındaki tüm kategoriler.


        if (blog) {
             res.render("admin/blog-edit",{ 
                title: blog.dataValues.baslik,
                blog: blog.dataValues,
                categories: categories,
            }
            )
        }


        res.redirect("admin/blogs") 
c
    } catch (error) {
        console.log(error);
    }
}  

exports.post_blog_edit = async(req ,res) => { 

    const blogid = req.body.blogid;
    const altbaslik = req.body.altbaslik;
    const baslik = req.body.baslik; 
    const aciklama = req.body.aciklama; 
    const url = req.body.url;
    const kategoriIds = req.body.categories;
    let resim = req.body.resim;
    console.log(kategoriIds , "xxxxxxxxxxxxxxxxxxxx");
 

    if (req.file) {
        resim = req.file.filename;

        fs.unlink("./public/images/" + req.body.resim, err => { 
            console.log(err); 
        })
    }

    const anasayfa = req.body.anasayfa == "on" ? "1" : "0" ; 
    const onay = req.body.onay == "on" ? "1" : "0" ; 



    try {
        
        const blog = await Blog.findOne({
            where:{
                id : blogid            
            },
            include:{ 
                model:Category,
                attributes:["id"] 
            }
        })

        if(blog){

            if (blog) {
                blog.update({
                    altbaslik : altbaslik,
                    baslik : baslik,
                    aciklama : aciklama,
                    resim : resim,
                    anasayfa : anasayfa,
                    onay : onay,
                    url: url,
            });

                if (kategoriIds == undefined) {  
                    await blog.removeCategories(blog.categories) 

                }else{
                    await blog.removeCategories(blog.categories) 
                
                const selectedCategories = await Category.findAll({
                    where:{
                        id: {
                            [Op.in] : kategoriIds
                        }  

                    }

                })
                await blog.addCategories(selectedCategories) //seçilen katagorileride benim mevcut blogumla ilişkilendir.
            }
            }

            return res.redirect("/admin/blogs?action=edit&blogid=" + blogid) 
        }
        res.redirect("/admin/blogs") 

    } catch (error) {
        console.log(error);
    }
} 


exports.get_category_remove = async(req , res) => {

    const blogid = req.body.blogid;
    const categoryid = req.body.categoryid;

    await sequelize.query(`delete from blogcategories where blogId=${blogid} and categoryId=${categoryid}`)


    res.redirect("/admin/categories/" + categoryid)
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
                model:Category,    
                attributes:["name"]
            }
        }) 
        console.log(blogs.categories);
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


exports.get_roles = async(req ,res) => {
    try {
        const roles = await Role.findAll({
/*İlgili kolonları seçiyoruz, kolonları seçerken role.id role.rolename si ayrıca o role ait olan kaç tane kullanıcı var bu bilgiyide biz count fonksiyonu aracılığıyla sayacağız. sayacak olacağımız yerde gelen userlerin altındaki id bilgisinin kolonunu sayacak ve bu değeri user_count olarak geri döndürecek bize. */
     attributes: {
         include: ["role.id" , "role.rolename" , [sequelize.fn("COUNT" , sequelize.col("users.id")) , "user_count"]] 
     },
     include:[ //ilişkili olan modeli getirelim  
         {model: User , attributes:["id"]}
         //burada model bilgimiz user, Yani her role ait olan user bilgisi bize gelicek. Ayrıca userın sadece id bilgisi gelecek.
     ],
     group:[ //gelen role kayıtlarının id değerlerine göre bunları gruplayıp bulacağız. Yani admin grubu altında olan user bilgileri,guest rolu altında olan kullanıcı bilgileri şeklinde gruplamamız gerekir.
          "role.id" //bu kısımda gruplamak önemli grupladıktan sonra altındaki user bilgilerini sayıyor. 
     ],
     raw:true,
     includeIgnoreAttributes:false //-> bunu yazmazsak gruplama aşamasında hata veriyor.
})
        res.render("admin/role-list", {
            title: "role listesi",
            roles: roles
        })
    } catch (error) {
        console.log(error);
    }
}
exports.get_role_edit = async(req ,res) => {

    const roleid = await req.params.roleid;
    try {

        const role = await Role.findByPk(roleid); 
        const users = await role.getUsers();    //ilgili role ait user bilgilerinide alalım 
//burada aldığımız role bir obje ve obje üzerinden getUsers adında bir method otomatik bir şekilde otomatik bir şekilde oluşuyor. User bilgilerini bu sayede alabiliriz.

        if(role) {
            return res.render("admin/role-edit",{
                title: role.rolename,
                role: role,
                users: users
            })
        }
    } catch (error) {
        console.log(error);
    }
}  

exports.post_role_edit = async(req ,res) => {

    const roleid = req.body.roleid;
    const rolename = req.body.rolename;
    try {
        await Role.update({rolename: rolename} ,{
            where: {
                id: roleid
            }
        })
        return res.redirect("/admin/roles")
        
    } catch (error) {
        console.log(error);
    }
}  

exports.roles_remove = async(req ,res) => {
    const roleid = req.body.roleid;
    const userid = req.body.userid;

    try {
        await sequelize.query(`delete from userRoles where userId=${userid} and roleId=${roleid}`);
        //klasik SQL sorgusu ile silme işlemi yapmış olduk
        return res.redirect("/admin/roles/"+ roleid);

    } catch (error) {
        console.log(error);
    }
}


exports.get_user = async (req, res) =>{

    /* Mantık basit users dan id fullname email bilgisini alıyoruz. Bunları alırken aynı zamanda usersla ilgi olan Rolleri de al ama Role in sadece rolename değperini al. */

    try {
        const users = await User.findAll({
            attributes: ["id","fullname","email"],  
            include:{
                model:Role,
                attributes:["rolename"]
            }
        })

        res.render("admin/user-list",{
            title: "user list",
            users: users
        })
    } catch (error) {
        console.log(error);
    }

}


