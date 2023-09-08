const express = require("express");
const router = express.Router();

const data =  {
    title:"Popüler Kurslar", //-> burdaki bilgiler ileriki dönemlerde veri tabanından gelecektir.
    categories:["Web Geliştirme","Mobil Uygulamalar","Veri Analizi","Programlama","Ofis Uygulamaları"]
// tabiki burada tanımlamış olduğumuz liste bilgiside veri tabınından gelecek ve biz yönetim paneli aracılığıyla buradaki bilgileri veri tabanında kalıcı bir dosya bir exel dosyası gibi düşünebiliriz, bu kalıcı dosyaya saklıyacağız ve biz uygulamayı çağırdığımız anda bu dosyaya bir sorgu gönderilecek ve bu bilgiler bize gelecek 
}


router.use( "/blogs/:blogid", (req ,res) => {
    res.render("users/blogDetails")
}  )


router.use( "/blogs", (req ,res) => {
    res.render("users/blogs")
}  )

router.use( "/", (req ,res) => {
    res.render("users/index" , data) //-> üsteki değişkeni index sayfasına göndermek için renden methodunun 2. parametresine yazarak gönderiyoruz. Artık data üzerinden title ye erişebiliyoruz.
}  )

module.exports= router