const Category = require("../models/category")
const Blog = require("../models/blog")

 const populate = async() => {
    
    const count = await Category.count() 

    if (count == 0) {
    
// İlk önce Catgory tablosuna eklediğimiz kategorilerin listesini uygulma tarafında bir değişkende tutacağım.
// iki tablo arasında bir liste alarak bu bilgiler üzerinden 3. tablomuza bir ekleme işlemi yapacağız.  
        const categories = await Category.bulkCreate([ 
            {name:"Web Geliştirme"},
            {name:"Mobil Uygulama Geliştirme"},
            {name:"Programlama"},
        ])

        const blogs = await Blog.bulkCreate([
            {
                baslik:"Komple Uygulamalı Web Geliştirme Eğitimi",
                altbaslik:"Sıfırdan ileri seviyeye 'Web Geliştirme': Html, Css, Sass, Flexbox, Bootstrap, Javascript, Angular, JQuery, Asp.Net Mvc&Core Mvc",
                aciklama:"Web geliştirme komple bir web sitesinin hem web tasarım (html,css,javascript), hem de web programlama (asp.net mvc) konularının   kullanılarak geliştirilmesidir. Sadece html css kullanarak statik bir site tasarlayabiliriz ancak işin içine bir web programlama dilini de katarsak   dinamik bir web uygulaması geliştirmiş oluruz.",
                resim:"1.jpg",
                anasayfa:true,
                onay:true,
            },
            {
                baslik:"Python ile Sıfırdan İleri Seviye Python Programlama",
                altbaslik:"Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
                aciklama:"En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın!",
                resim:"2.jpg",
                anasayfa:true,
                onay:true,
            },
            {
                baslik:"Node.js ile Sıfırdan İleri Seviye Web Geliştirme",
                altbaslik:"Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.",
                aciklama:"En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın!",
                resim:"3.jpg",
                anasayfa:true,
                onay:true,
            },
            {
                baslik:"Node.js ile Sıfırdan İleri Seviye Web Geliştirme",
                altbaslik:"Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.",
                aciklama:"En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın!",
                resim:"4.jpg",
                anasayfa:true,
                onay:true,
            },
        ]
        )

        await categories[0].addBlog(blogs[0]);
    //-> Var olan bir kategori bilgsine var olan bir blog bilsini eklemiş olsuk.( Yeni bir tane blog eklemiyoruz !!! ) 
    // 1 numaralı kartagoriye 1 numaralı blog insert edildi bağlandı

        await blogs[0].addCategory(categories[1]);
    //burada da tam tersinden bakıyoruz olaya 
    // 1. blog bilgisine 2. kategori bilgisini bağlamış oldum. -> türkçe meali 1. blog 2. kategoriye bağlı demiş olduk.


    await categories[1].addBlog(blogs[2]);
    await categories[0].addBlog(blogs[1]);
    await categories[2].addBlog(blogs[3]); // burada aslında bir kategori birden fazla blog, bir blog da birden fazla kategoriye 
    await categories[0].addBlog(blogs[2]); // atanabileceğini göstermiş oluyoruz.


    await categories[2].createBlog({
        baslik:"Yeni many to many özellikleriyle bir kategoriye yeni bir blog oluşturarak ekledim",
        altbaslik:"Sıfırdan ileri seviyeye 'Web Geliştirme': Html, Css, Sass, Flexbox, Bootstrap, Javascript, Angular, JQuery, Asp.Net Mvc&Core Mvc",
        aciklama:"Web geliştirme komple bir web sitesinin hem web tasarım (html,css,javascript), hem de web programlama (asp.net mvc) konularının   kullanılarak geliştirilmesidir. Sadece html css kullanarak statik bir site tasarlayabiliriz ancak işin içine bir web programlama dilini de katarsak   dinamik bir web uygulaması geliştirmiş oluruz.",
        resim:"1.jpg",
        anasayfa:true,
        onay:true,
    })
    //bu kısımda hem yeni bir blog eklemiş olduk hemde bloğu eklediğimiz gibi bir tane kategoriye bağlamış olduk.
}}
    module.exports = populate;