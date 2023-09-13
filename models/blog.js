const {DataTypes} = require("sequelize");
const sequelize = require("../data/db")  

const Blog = sequelize.define("blog" , { 
    blogid:{ 
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    baslik:{
        type: DataTypes.STRING,
        allowNull:false, 
    },
    altbaslik:{
        type:DataTypes.STRING,
        allowNull:false
    },
    aciklama:{
        type:DataTypes.TEXT,
        allowNull:true 
    },
    resim:{
        type:DataTypes.STRING,
        allowNull:false
    },
    anasayfa:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    onay:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    categoryid:{
        type:DataTypes.INTEGER,
        allowNull:false
    }

})

 const  sync = async() => { 
    await Blog.sync({alter : true})
    console.log ("Blog tablosu eklendi")


        const count = await Blog.count;

        if (count == 0) {
            await Blog.bulkCreate([
                {
                    baslik:"Komple Uygulamalı Web Geliştirme Eğitimi",
                    altbaslik:"Sıfırdan ileri seviyeye 'Web Geliştirme': Html, Css, Sass, Flexbox, Bootstrap, Javascript, Angular, JQuery, Asp.Net Mvc&Core Mvc",
                    aciklama:"Web geliştirme komple bir web sitesinin hem web tasarım (html,css,javascript), hem de web programlama (asp.net mvc) konularının   kullanılarak geliştirilmesidir. Sadece html css kullanarak statik bir site tasarlayabiliriz ancak işin içine bir web programlama dilini de katarsak   dinamik bir web uygulaması geliştirmiş oluruz.",
                    resim:"1.jpg",
                    anasayfa:true,
                    onay:true,
                    categoryid:1
                },
                {
                    baslik:"Node.js ile Sıfırdan İleri Seviye Web Geliştirme",
                    altbaslik:"Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.",
                    aciklama:"En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın!",
                    resim:"2.jpg",
                    anasayfa:true,
                    onay:true,
                    categoryid:1
                },
        
            ]
        )
        }
       }
 sync()

 module.exports = Blog;

