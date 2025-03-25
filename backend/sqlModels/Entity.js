const { DataTypes } = require('sequelize');
const { sequelize } = require('../mysqlConnect');
const User = require('./User');

// Define Entity model for MySQL
const Entity = sequelize.define('Entity', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Define relationship
Entity.belongsTo(User, { 
  foreignKey: 'created_by',
  as: 'creator'
});
User.hasMany(Entity, { 
  foreignKey: 'created_by',
  as: 'entities'
});

module.exports = Entity;