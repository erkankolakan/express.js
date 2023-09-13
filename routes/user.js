const express = require("express");
const router = express.Router();
const db = require("../data/db")


const Blog = require("../models/blog") 
const Category = require("../models/category")//oluşturmuş olduğumuz databaseleri buraya çağırıyoruz.

const {Op} = require("sequelize") //sorgularda and, or, between gibi ifadeler kullanamak istiyorsak Op (operator) u çağırman gerek


router.use("/blogs/category/:categoryid" , async (req , res) => {
    const id = req.params.categoryid 

    try {

        const blogs = await Blog.findAll({
            where:{
                categoryid:id,
                onay:true
            },
            raw:true // !!! raw:true yazmasak HTML sayfası üzerinde değişiklik yapmak zorunda kalırdık
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
        const blog = await Blog.findByPk(id)  //bu şekilde id yi Blog a gönderdiğin zaman o değere eşit PK geliyor ztn





      
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
                    [Op.eq]: true //burada dediği aslında onay=1 olanlar. (Op yi göstermek amaçlı böyle yazdım)
                }
            },
            raw:true //dersek sadece bilgiyle uğraşırız extra bilgiler çöpeee
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



/*
    ONCESİ
    db.query("select * from blog where onay=1 and anasayfa=1")

    SONRASI
    const blogs = await Blog.findAll({
    where:{
        onay:true,
        anasayfa:true
    },
    raw: true 
----------------------------------------------------------------------------

    const blogs = await Blog.findAll({
        where:{
            onay:{
                [Op.eq]: true //burada dediği aslında onay=1 olanlar. (Op yi göstermek amaçlı böyle yazdım)
            }
        },
        raw:true //dersek sadece bilgiyle uğraşırız extra bilgiler çöpeee
    })

    şeklinde de yapılabilir

    const blogs = await Blog.findAll({
        where:{
            onay:1
        }
    })

---------------------------------------------------------------------------

         const blog = await Blog.findOne({
             where: {
                 blogid:id                        ->> findOne ile kullanımı
             },
                 raw:true
         })

        const blog = await Blog.findOne({
            where:{
                blogid:{
                    [Op.eq]:id                   ->> Operator ile kullanımı       
                }
            }
        })


        const blog = await Blog.findByPk(id)      ->> findBtPk ile kullanımı   aynı değeri birden fazla şekilde kolayca çağırabiliyoruz

*/