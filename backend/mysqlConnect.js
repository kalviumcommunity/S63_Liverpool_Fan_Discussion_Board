const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create a Sequelize instance for MySQL connection
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || 'liverpool_fan_board',
  process.env.MYSQL_USER || 'root',
  process.env.MYSQL_PASSWORD || '',
  {
    host: process.env.MYSQL_HOST || 'localhost',
    dialect: 'mysql',
    logging: console.log,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Test the connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL Connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to MySQL database:', error);
  }
};

module.exports = { sequelize, testConnection };