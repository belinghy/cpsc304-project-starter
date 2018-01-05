const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "Demo",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "postgres",
  {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 5432,
    dialect: "postgres",
    pool: {
      max: 10,
      min: 0,
      idle: 30000
    },
    define: {
      timestamps: false
    }
  }
);

module.exports = sequelize;
