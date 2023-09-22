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
    const userid = req.session.userid
    const isAdmin = req.session.roles.includes("admin")

    try {
        const blog = await Blog.findOne({
        where: isAdmin ? { id: blogid } : { id: blogid , userId:userid }
        })

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
    const anasayfa = req.body.anasayfa == "on" ? 1:0 ; 
    const onay = req.body.onay == "on" ? 1:0 ;
    const userid = req.session.userid;

    let resim = "" //file bilgisi ilk başta boş geçelim çünkü file değeri girilmezse file üretilmez bu da bir hataya neden olur. Zaten bir file bilgisi gelirse de zaten aşağıda resmin içini req.file.filename ile dolduruyoruz.

    try {

        if (baslik == "") {
            throw new Error("Başlık boş geçilemez")
    // Errodan türetilmiş bir obje tanımlıyoruz
        }

        if (baslik.length < 5 || baslik.length > 20) {
            throw new Error("Başlık değeri 5-20 karekter aralığında olmalıdır.")
        }

        if (aciklama == "") {
            throw new Error("Açıklama boş geçilemez")
        }

        if (req.file) {
            resim = req.file.filename
            fs.unlink("./public/images" + req.body.resim , err => {
                console.log(err)
            })
        }

        await Blog.create({
            baslik:baslik,
            altbaslik:altbaslik,
            url: slugField(baslik), //bu sayede gelen baslık değeri slugField içerisinden geçerek bir url olarak veri tabanında url satırana kaydolur
            aciklama:aciklama,
            resim:resim,
            anasayfa:anasayfa,
            onay:onay,
            userId:userid
        }) 
        res.redirect("/admin/blogs?action=create"); 

    } catch (err) {
        let hataMesaji = ""; //sayfaya gönderilecek olan mesaj. Bizim bunu err objesi içinde alamamız lazım. Hata bize geldiği zaman gerçekten bir javascript hatası olduğunu kontorl etmemiz gerekir. Çünkü yarın öbürgün başka hatalarımızda gelecek bize

        if (err instanceof Error) { //gelen err nin Errordan türetilen bir obje olup olmadığını kontrol ediyoruz. Yukarıda da biz zaten errordan türetilmiş bir obje tanıtıyoruz zaten.
            hataMesaji += err.message,    //-> yukarıda tanımlamış olduğum mesaj içerisine err den gelen mesaj parametresini ekliyoruz.    

            res.render("admin/blog-create",{
                title: "category sileme işlemleri",
                categories: await Category.findAll(),
                message: {
                    text: hataMesaji, class: "danger"},
                values:{
                    baslik:baslik,
                    altbaslik:altbaslik,
                    aciklama:aciklama
                }
                    
            })
        }
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
    const userid = req.session.userid
    const isAdmin = req.session.roles.includes("admin")

    try {
        const blog = await Blog.findOne({

    //isAdmin kullanıcı gelmişse bize bu durumda kullanıcı flitrelemene gerek yok. biz adminiz istediğimiz bloga istediğimiz müdahaleyi yapabilmeliyiz. ama bize bir moderator geldiyse kullanıcıya göre yetki ver.
            where: isAdmin ? {id : blogid} : { id : blogid, userId : userid,},
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
        res.redirect("/admin/blogs") 
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
    const userid = req.session.userid


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
                id : blogid,
                userId:userid  // bu şekilde userid değerini de sorgulamalıyız ki birinin yazdığı blogu bir başkası değiştiremesin
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
    const userid = req.session.userid;
    const isModerator = req.session.roles.includes("moderator"); //includes ile moderator rolüne sahip mi sorusunu soralım. Moderator roles dizisi içinde varsa bize true değerini döndürecek.
    const isAdmin = req.session.roles.includes("admin");

    try {
        const blogs = await Blog.findAll({ 
            attributes: ["id","baslik","altbaslik","resim"],
            include: {
                model: Category,
                attributes: ["name"]
            },
//herbir kolonun userId kolonu ile gelen userid değeriyle eşleşen değerleri al.
//gelen kullanıcı isModerator ve isAdmin değilse yani kullanıcı moderatörse sorgulama yapacağız. Burada aslında admin rolünde alan birine bir filitreleme olmadan tüm listeler gözükecektir.
            where: isModerator && !isAdmin ? { userId: userid } : null
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

exports.get_user_edit = async (req, res) =>{
    const userid = req.params.userid

    /* Bize paramsdan gelen id ye sahip olan user gelecek o gelirken tanında bu user a ailt olan rollerin id değerleri gelecek. */

    try {
        const user = await User.findOne({
            where: { id:userid },
            include: {model:Role  , attributes:["id"]}
        })

        const roles = await Role.findAll()

        res.render("admin/user-edit",{
            title: "user edit",
            user: user,
            roles: roles
        })
    } catch (error) {
        console.log(error);
    }
}

exports.post_user_edit = async (req, res) =>{
    const userid = req.body.userid;
    const fullname = req.body.fullname;
    const email = req.body.email;
    const roleIds = req.body.roles; //tüm seçilen id bilgileri

    try {
        const user = await User.findOne({
            where: { id:userid },
            include: {model:Role  , attributes:["id"]}
        });
        
        if(user){
            user.fullname = fullname;
            user.email = email ;

            if (roleIds == undefined) {//roleId dizisi undedined ise hiçbirşey seçilmemiştir. Bu yüzden dolayı da ilgili userın tüm rollerini sil derim.
                await user.removeRoles(user.roles)
            }else{
                await user.removeRoles(user.roles) //eğer birşey seçmişse tekrardan siler en baştan silerim.
                const selectedRoles = await Role.findAll({
                    where:{
                        id:{
                            [Op.in] : roleIds
//vermiş olduğum dizi içerisindeki roleIds lerle eşleşen kayıtları al. Örneğin 1, 2 bilgisiyle eşleşen kayıtları alacak ve veri tabanına userın o role sahip olduğunu yazdıracağız. 
                        }
                    }
                });
                await user.addRoles(selectedRoles) //seçilen bilgileri userın Rolesına a eklemiş olduk
            }

            await user.save()
            return res. redirect("/admin/users")
    }
        return res. redirect("/admin/users")

    } catch (error) {
        console.log(error);
    }
}
