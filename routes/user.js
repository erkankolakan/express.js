const express = require("express");
const router = express.Router();
const db = require("../data/db")

router.use( "/blogs/:blogid", async(req ,res) => {

    const id = req.params.blogid //url deki blogid kısımına yazılan id değerini alır oldukça önemlidir. Gelen bilgi olduğu için req le alıyoruz.

    try {
        const [blog, ] = await db.query("select * from blog where blogid=?", [id])
        // const [blogs, ] = await db.query("select * blog where blogid=? and baslik=?", [id , baslik]) eğer iki tane belirleyicimiz olsa bu şekilde yapardık.

        if (blog[0]) { //bu şekilde yapmamızın sebebi bizde sadece 4 tane id var kullanıcı gidip url de 4651531 yazarsa uygulama takılır biz takılmasını istemediğimiz için geçersiz bir blogid değeri geldiği zaman bizi direk index atsın diye
            return res.render("users/blogDetails" , {
            title: blog[0].baslik, //bunu direk blogDetail sayfasında kullanmasakda parçalar klasöründe head kullanıyor o yüzden göndermemiz gerek
            blog: blog[0], //blog[0] ı blogDetails sayfasına blog adıyla gönderdir şimdi blogDetails dan karşılaman gerekir 
        })}
        res.redirect("/") //retun a girerse onun aşağısındaki kodlar çalışmayacağı için gönül rahatlığıyla bu şekilde yazabiliriz 

    } catch (error) {
        console.log(error);
    }

}  )

router.use( "/blogs", async(req ,res) => {
    try{
        const [blogs, ] = await db.query("select * from blog where onay=1")
        const [categories, ] = await db.query("select * from category") 

        res.render("users/blogs" , {
            title:"Tüm Kurslar",
            blogs:blogs, 
            categories: categories 
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
            categories:categories
        })
    }
    catch(err){
        console.log(err)
    }

}  )
module.exports= router
