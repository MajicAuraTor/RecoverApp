const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
  console.log('🔍 Testing MySQL connection...');
  console.log('Host:', process.env.DB_HOST);
  console.log('Port:', process.env.DB_PORT);
  console.log('User:', process.env.DB_USER);
  console.log('Database:', process.env.DB_NAME);
  
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD,
    });
    
    console.log('✅ MySQL connection successful!');
    
    // Check if database exists
    const [databases] = await connection.execute('SHOW DATABASES');
    console.log('📋 Available databases:');
    databases.forEach(db => console.log('  -', Object.values(db)[0]));
    
    // Check if our database exists
    const dbExists = databases.some(db => Object.values(db)[0] === process.env.DB_NAME);
    
    if (dbExists) {
      console.log(`✅ Database '${process.env.DB_NAME}' exists!`);
      
      // Create new connection with database specified
      await connection.end();
      const dbConnection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      
      const [tables] = await dbConnection.execute('SHOW TABLES');
      console.log('📊 Available tables:');
      if (tables.length === 0) {
        console.log('  - No tables found. Database is empty.');
      } else {
        tables.forEach(table => console.log('  -', Object.values(table)[0]));
      }
      
      await dbConnection.end();
    } else {
      console.log(`❌ Database '${process.env.DB_NAME}' does not exist!`);
      console.log('💡 You need to create the database first.');
      await connection.end();
    }
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('💡 Possible issues:');
    console.log('  - MySQL server is not running');
    console.log('  - Incorrect credentials');
    console.log('  - Database does not exist');
  }
}

testConnection();
