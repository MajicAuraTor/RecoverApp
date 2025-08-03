import mysql from 'mysql2/promise';

// 🗄️ MySQL DATABASE CONFIGURATION
// Update these settings to match your MySQL Workbench setup
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'your_password', // Update this!
  database: process.env.DB_NAME || 'webappdb',     // Your database name
  // Connection pool settings for better performance
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
};

// Create connection pool
export const pool = mysql.createPool(dbConfig);

// Test database connection
export const connectDB = async (): Promise<void> => {
  try {
    // Test the connection
    const connection = await pool.getConnection();
    console.log('🗄️ MySQL Connected successfully!');
    
    // Test query to verify connection
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('✅ Database test query successful');
    
    connection.release();
    
  } catch (error) {
    console.error('❌ MySQL connection failed:', error);
    console.log('💡 Please check:');
    console.log('   - MySQL server is running');
    console.log('   - Database credentials are correct');
    console.log('   - Database exists');
    process.exit(1);
  }
};

// Helper function to execute queries
export const executeQuery = async (query: string, params: any[] = []) => {
  try {
    const [rows] = await pool.execute(query, params);
    return rows;
  } catch (error) {
    console.error('Query execution error:', error);
    throw error;
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🗄️ Closing MySQL connection pool...');
  await pool.end();
  process.exit(0);
});
