const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "vubaovyc",
  process.env.DB_USER || "vubaovyc",
  process.env.DB_PASSWORD || "1zQveMh7mzp0wMBzHLqkzlw7dixVaNbI",
  {
    host: process.env.DB_HOST || "elmer.db.elephantsql.com",
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
