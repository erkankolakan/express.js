const {DataTypes} = require("sequelize");
const sequelize = require("../data/db") 

const Role = sequelize.define("role" , {  //role adında bir tablo oluşturduk
    rolename:{
        type: DataTypes.STRING,
        allowNull:false, 
    }
})

 module.exports = Role;
