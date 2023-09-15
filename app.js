const express = require("express");
const app = express(); 
const path = require("path") 
const userRoutes = require("./routes/user") 
const adminRoutes = require("./routes/admin")


app.use(express.urlencoded())

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
    //one to many (bire çok ilişki)
        Category.hasMany(Blog, {  
            foreignKey:{
                name:"categoryId",  
                allowNull:false, 
            },
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT"
        });
        Blog.belongsTo(Category);

    ( async () => {
        await sequelize.sync({ alter: true })
        await dummyData();  
    })();


    app.listen(3000 , () => {
        console.log("Server started on port 3000");
    })
    