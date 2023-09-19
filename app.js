const express = require("express");
const app = express(); 
const path = require("path") 
const userRoutes = require("./routes/user") 
const adminRoutes = require("./routes/admin")
const authRoutes = require("./routes/auth")
const cookieParser = require("cookie-parser") //cookie
const session = require("express-session") //session

app.use(cookieParser())  //çağırdığımız değeri middle vare olarak çağırıyoruz.
app.use(session({
    secret:"0ade738c-2251-433f-8482-68ae2c6aa6b6", //section bilgisine ulaşırken bir key bilgisine ihtiyacımız var. Web de Random guid diye bir arama yapıp, random bir key değeri alabiliriz 
    resave: true, //-> true dersek session üzerinde bir değişiklik olursa her seferinde değişiklik olsun ya da olmasın session bilgisinin kaydı tekrardan yapılabilir. Ya da false dersek bu özellik kapanır ve sadece bir değişiklik yaprığımızda bir güncelleme olur. 
    saveUninitialized: false, // biz eğer true dersek bir session oluşturalım ya da oluşturmayalım hiç farketmez her her kullanıcıyı ziyaret bir kullanıcı için bir session deposunun server tarafında oluşturulacağını burada garanti altına almış oluyoruz. Tabikii burada false yazsakta otoamtik bir şekilde session deposu oluşturmasada biz session ile bir bilgi gönderdiğimiz zaman yine session deposu oluşmuş olacak.
    cookie:{ //biz siteden çıktıktan bir süre sonra otomatik bir şekilde silinir. Biz bu cookie ye bir süre tanımlayabiliyoruz.
        maxAge: 1000 * 60 * 60 * 24 // kullanıcı login olduktan 1 gün sonra cookie silecek bu sayede de kullancıyı uygulamada atacaktır. Kullanıcının tekrar login olması gerekir. 1000  dersek bir saniyelik bir cookie vermiş olurum. Aslında 1 saniyelik oturum süresi tanımlamış olurum. 
    }
}));

/*
    session içinde depoladığım veri kullanıcının tarayıcısında değil
*/

app.use(express.urlencoded())

app.set("view engine","ejs")

app.use("/libs" , express.static(path.join(__dirname,"node_modules")))
app.use("/static", express.static(path.join(__dirname,"public")))    

    app.use("/admin",adminRoutes); 
    
    app.use("/account", authRoutes);  
    
    app.use(userRoutes); 

    const sequelize = require("./data/db") 
    const dummyData = require("./data/dummy-data") 
    const Category = require("./models/category")
    const Blog = require("./models/blog")
    const User = require("./models/user")   

    Blog.belongsTo(User); 
    User.hasMany(Blog); 

    Blog.belongsToMany(Category , {through: "blogCategories"});  
    Category.belongsToMany(Blog , {through: "blogCategories"});

(async () => {
    await sequelize.sync({force: true});
    await dummyData()
})();

    app.listen(3000 , () => {
        console.log("Server started on port 3000");
    })

        // //ilişkiler
    // //one to many (bire çok ilişki)
    //     Category.hasMany(Blog, {  
    //         foreignKey:{
    //             name:"categoryId",  
    //             allowNull:false, 
    //         },                                          --->>>> bire çok ilişki
    //         // onDelete: "RESTRICT",
    //         // onUpdate: "RESTRICT"
    //     });
    //     Blog.belongsTo(Category);

    // ( async () => {
    //     await sequelize.sync({ alter: true })
    //     await dummyData();  
    // })();