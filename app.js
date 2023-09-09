// MySQL e nasıl bağlanıyoruz oynat bakalım
// uygulamamız ile veri tabanı arasındaki bağlantıyı sağlayacak bir kütüphanemiz var  -> mysql2
const express = require("express");
const app = express(); 
const path = require("path") 
const userRoutes = require("./routes/user") 
const adminRoutes = require("./routes/admin")
const mysql = require("mysql2") //serverri uygulamaya bağlmakak için gerekli kütüphaneyi indirdik. 
const config = require("./config")
const connection = mysql.createConnection(config.db) //bağlanacağımız server ile bilgileri buraya gönderememiz gerekir. Bu bilgileri tüm sayfalardan erişebilmek ve sürekli aynı şeyleri tekrer tekrar yazmamak için ortak bir sayfadan erişeceğiz o sayfada config.js dosyası olacak.


connection.connect((err) => { //burasu servere bağlanıp bağlanamadığımızı yoklayacak olan kısım
    if (err) {
    return console.log(err);
    }
    connection.query("select * from blog", (err , result) => {
        console.log(result)
//query methodu sayesinde bir tane sql cümleciğini yazdırabiliyoruz. Örneğin bağlanmış olduğumuz veri tabanındaki blog tablosundaki bütün kayıtları alalım. Bu sorgu çalışacak bittiğinden emin olmak için callback fonksiyonu tanımlıyoruz, fonksiyona gelen bilgiler err ve resul (hata ve cevap )
//bize veri tabanındaki tüm ojeler gelir eğer ben ilk objeyi almak istiyorsam result[0] diyerek index numarası ile çağırabilirim. result[0].title yazark da başlık bilgisini alabiliriz.
    })   
    console.log("Bağlantı başarılı");
/* Bu şekilde kullandık ve else yok,->
Bu şekilde kullandığımız zaman if içinde retun var retun gerçekten değeri döndürürse bir alt satıra geçmeden direk fonksiyondaki işlemi bitirir. Eğer retun çalışmasada otomatik bir şekilde console.log("Bağlantı başarılı") yazınısını consoleye yazdıracaktır. */
})

app.set("view engine","ejs")

app.use("/libs" ,express.static(path.join(__dirname,"node_modules")))
app.use("/static",express.static(path.join(__dirname,"public")))    

    app.use("/admin",adminRoutes); 
    app.use(userRoutes); 

    app.listen(3000 , () => {
        console.log("Server started on port 3000");
    })





