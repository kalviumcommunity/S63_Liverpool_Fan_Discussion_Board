const { sequelize, testConnection } = require('../mysqlConnect');
const User = require('./User');
const Entity = require('./Entity');

// Initialize all models and relationships
const initializeDatabase = async () => {
  try {
    // Test the connection
    await testConnection();
    
    // Sync all models with the database
    // force: false - This doesn't drop tables if they already exist
    await sequelize.sync({ force: false });
    console.log('✅ MySQL Database synchronized successfully');
    
    return {
      sequelize,
      User,
      Entity
    };
  } catch (error) {
    console.error('❌ Failed to initialize MySQL database:', error);
    throw error;
  }
};

// Seed the database with initial data
const seedDatabase = async () => {
  try {
    // Create users if they don't exist
    const users = [
      { username: 'john_doe', email: 'john@example.com', password: 'password123' },
      { username: 'jane_smith', email: 'jane@example.com', password: 'password123' },
      { username: 'alex_wilson', email: 'alex@example.com', password: 'password123' }
    ];
    
    for (const userData of users) {
      const [user, created] = await User.findOrCreate({
        where: { email: userData.email },
        defaults: userData
      });
      
      if (created) {
        console.log(`✅ User created: ${userData.username}`);
      } else {
        console.log(`ℹ️ User already exists: ${userData.username}`);
      }
    }
    
    // Get the created users
    const createdUsers = await User.findAll();
    
    // Create entities if they don't exist
    const entities = [
      { name: 'Liverpool FC', created_by: createdUsers[0].id },
      { name: 'Anfield Stadium', created_by: createdUsers[1].id },
      { name: 'The Kop', created_by: createdUsers[2].id },
      { name: 'Premier League', created_by: createdUsers[0].id },
      { name: 'Champions League', created_by: createdUsers[1].id }
    ];
    
    for (const entityData of entities) {
      const [entity, created] = await Entity.findOrCreate({
        where: { name: entityData.name },
        defaults: entityData
      });
      
      if (created) {
        console.log(`✅ Entity created: ${entityData.name}`);
      } else {
        console.log(`ℹ️ Entity already exists: ${entityData.name}`);
      }
    }
    
    console.log('✅ Database seeded successfully');
  } catch (error) {
    console.error('❌ Failed to seed database:', error);
    throw error;
  }
};

module.exports = {
  initializeDatabase,
  seedDatabase,
  User,
  Entity
};