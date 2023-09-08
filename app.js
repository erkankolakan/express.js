//Blog listesini hazırlayıp bir döngüsü aracılığıyla sayfada dinamik olarak gösterilirim.

const express = require("express");
const app = express(); 
const path = require("path") 
const userRoutes = require("./routes/user") 
const adminRoutes = require("./routes/admin")


app.set("view engine","ejs")


app.use("/libs" ,express.static(path.join(__dirname,"node_modules")))
app.use("/static",express.static(path.join(__dirname,"public")))    


    app.use("/admin",adminRoutes); 
    app.use(userRoutes); 



    app.listen(3000 , () => {
        console.log("Server started on port 3000");
    })


