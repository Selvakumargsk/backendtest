const { DataTypes, UUID, Sequelize } = require("sequelize");
const sequelize = require("../utilsfunction");

const User = sequelize.define('User' , {
    id: {
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,    
        allowNull: false,
        primaryKey: true
      },
    name : {
        type : DataTypes.STRING,
        allowNull : true,
    },
    email : {
        type : DataTypes.STRING,
        allowNull : true,
    },
    username : {
        type : DataTypes.STRING,
        allowNull : true,
    },
    phone :{
        type : DataTypes.STRING,
        allowNull : true
    },
    website :{
        type : DataTypes.STRING,
        allowNull : true
    },
    
})

module.exports = User;