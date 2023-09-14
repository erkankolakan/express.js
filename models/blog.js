const {DataTypes} = require("sequelize");
const sequelize = require("../data/db")  

const Blog = sequelize.define("blog" , { 
  
    /*
    blogid:{ 
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },

        Hatda her bir modele de id eklememiz gerekmez zaten her bir modelin burada uygulamış olduğumuz özelliklerde bir id bilgisi olacak dolayısıyla ben burayıda siliyorum
    */

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
    }
    /* ,
    // categoryid:{
    //     type:DataTypes.INTEGER, //---->> bunun burdan kaldırıyoruz bunu kendisi otomatik bir şekilde keliyor olacağızç 
    //     allowNull:false
     } */

})



 module.exports = Blog;

