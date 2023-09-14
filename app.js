const express = require("express");
const app = express(); 
const path = require("path") 
const userRoutes = require("./routes/user") 
const adminRoutes = require("./routes/admin")


app.use(express.urlencoded())// biz bunu yazdığımız zaman post işleminde gelen veriler bize json formatında gelecekir. Eğer bunu yazmazsak gelen veri undifened olacaktır

app.set("view engine","ejs")

app.use("/libs" , express.static(path.join(__dirname,"node_modules")))
app.use("/static", express.static(path.join(__dirname,"public")))    



    app.use("/admin",adminRoutes); 
    app.use(userRoutes); 


    const sequelize = require("./data/db") 
    const dummyData = require("./data/dummy-data") 
    const Category = require("./models/category")
    const Blog = require("./models/blog")

    //ilişkiler
    //one to many (bire çok ilişki) ->  
        Category.hasMany(Blog,{  //-->> bir kategory bilgisi bizim için birden fazla blog bilgisine sahip olacak. 
            foreignKey:{
                name:"categoryId",
                allowNull:false, //-->> bu şekilde yaparsak gelen yabancı anahtar değeri boş geçilemez olur.
                // defaultValue:1 //-->> veri tabanında default olarak 1 gelir. Kullanıcı seçtiği zaman da seçtiği değer olur. Bu kolon allowNull:false dersek null değer kabul etmez mutlaka bir id atamamız gerekir ki bu id değeri katagori modeli içersinde mutlaka olması gerekir. 

            }
        });             
        Blog.belongsTo(Category) //-->> bir blog bir tane katagorye ait olacak. blongs ait olamak demek.

/*
    Default olarak gelen id değerleri boş geçilebilir geliyor ama biz boş geçilemesin istiyorsak. yabancı anahtar hangi tabloya gidiyorsak onun ikinci parametresine özelliğini belirtebiliriz.
*/

/*
A.hasOne(B) -> yabancı anahtarı hedef tabloya eklenir
A.belogsTo(B) -> yabancı anahtarı kaynak tabloya eklenir
A.hasMany(B) -> yabancı anahtarı hedef tabloya eklenir
*/

    //uygulanması - sync  

    ( async () => {
        await sequelize.sync({ force: true }) //force:true diyerek datayı siliyorduk
        await dummyData();  //dummyData diyerek de dataya yazdırdığımız değerleri tekrardan yazdırıyoruz 
    })();

// fonkssiyon oluşsturup sonra o fonksiyonu tekrardan aşağıdan çağırmak ile uğraşmak istemiyorsan IIFE ile bunu yapabilirsin. Bu sayede kendi kendini çağıran bir fonksiyon oluşturmuş oluyoruz. Biz burdaki fonksiyonu async bir şekilde tanımladık.  (xxxxxxxxxxxxxxx)();


    app.listen(3000 , () => {
        console.log("Server started on port 3000");
    })





