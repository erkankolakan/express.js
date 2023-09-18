// User bilgilerini depolamak için user adında yeni bir tablo oluşturuyoruz.

const { Model } = require("sequelize");
const  sequelize  = require("../data/db");
const  DataTypes  = require("sequelize");


const User = sequelize.define("user" ,{  //tablomuzun ismi user

    fullname:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }

    
},{ timestamps: true })  

module.exports = User;