const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "ouikdqby",
  process.env.DB_USER || "ouikdqby",
  process.env.DB_PASSWORD || "kSZ2Fq36lvLix8XgOz_2nB8NfofO47ZO",
  {
    host: process.env.DB_HOST || "baasu.db.elephantsql.com",
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
