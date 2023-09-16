const {DataTypes} = require("sequelize");
const sequelize = require("../data/db")  

const Blog = sequelize.define("blog" , { 
  
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
},{
    timestamps: true,   //tüm tablolarda biz timestamps (createAt, updateAt) değerini kapattık ama blogda görünsün istediğimiz için gelip burda özellikle açık olması gerektiğini söyledik
}
)

 module.exports = Blog;

