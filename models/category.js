const {DataTypes} = require("sequelize");
const sequelize = require("../data/db") 

const Category = sequelize.define("category" , { 
/*    category_id:{ 
        type: DataTypes.INTEGER,
        autoIncrement:true,   --------->>> biz burayıda kaldırıyoruz zaten her model içersine id isminde bir tane kolon birincil anahtar ve otomatik 
        allowNull:false,                  sayı olarak zaten direk eklenecek  dolayısıyla bunları buradan almış olalım
        primaryKey:true, 
    },*/

    name:{
        type: DataTypes.STRING,
        allowNull:false, 
    },
},{
    timestamps:false 
})

 module.exports = Category;
