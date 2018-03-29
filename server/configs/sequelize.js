const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "bvuzqveg",
  process.env.DB_USER || "bvuzqveg",
  process.env.DB_PASSWORD || "eLf95vBqOhKXzVz-4LAEnOnmI05ZHFFi",
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
