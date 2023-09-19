const express = require("express");
const app = express(); 
const path = require("path") 
const userRoutes = require("./routes/user") 
const adminRoutes = require("./routes/admin")
const authRoutes = require("./routes/auth")
const cookieParser = require("cookie-parser") //cookie
const session = require("express-session") //session

app.use(cookieParser())

app.use(session({
    secret:"0ade738c-2251-433f-8482-68ae2c6aa6b6", 
    resave: true, 
    saveUninitialized: false, 
    cookie:{ 
        maxAge: 1000 * 60 * 60 * 24
    }
}));


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