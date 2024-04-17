const { Sequelize } = require("sequelize");
const { config } = require("dotenv");
config();

const { DATABASE_URL, DATABASE, USUARIOBD, PASSWORD, HOST } = process.env;

const sequelize = new Sequelize(DATABASE, USUARIOBD, PASSWORD, {
  host: HOST,
  dialect: "postgres",
});

module.exports = sequelize;
