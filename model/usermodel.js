const { DataTypes, UUID, Sequelize } = require("sequelize");
const sequelize = require("../utilsfunction");

const User = sequelize.define('User' , {
    id: {
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,    
        allowNull: false,
        primaryKey: true
      },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    username : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    number :{
        type : DataTypes.STRING,
        allowNull : false
    }
})

module.exports = User;