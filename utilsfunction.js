const { Sequelize } = require('sequelize');
const dotenv = require('dotenv')

dotenv.config()

const db_host = process.env.DB_HOST;
const db_name = process.env.DATABASE;
const db_user = process.env.DB_USER;
const db_pwd = process.env.DB_PWD;

const sequelize = new Sequelize(db_name , db_user , db_pwd , {
    host : db_host,
    dialect : 'mysql'
  });

module.exports = sequelize;  