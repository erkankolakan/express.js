const express = require("express");
const app = express(); 
const path = require("path") 
const userRoutes = require("./routes/user") 
const adminRoutes = require("./routes/admin")


app.use(express.urlencoded())// biz bunu yazdığımız zaman post işleminde gelen veriler bize json formatında gelecekir. Eğer bunu yazmazsak gelen veri undifened olacaktır

app.set("view engine","ejs")

app.use("/libs" , express.static(path.join(__dirname,"node_modules")))
app.use("/static", express.static(path.join(__dirname,"public")))    

const Blog = require("./models/blog")
const Category = require("./models/category")


    app.use("/admin",adminRoutes); 
    app.use(userRoutes); 

    app.listen(3000 , () => {
        console.log("Server started on port 3000");
    })





