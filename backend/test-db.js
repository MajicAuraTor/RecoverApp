// Quick MySQL connection test
import { connectDB } from './src/config/database';

async function testConnection() {
  console.log('🧪 Testing MySQL connection...');
  try {
    await connectDB();
    console.log('✅ MySQL connection successful!');
    console.log('🚀 Your database is ready for Prisma Studio!');
  } catch (error) {
    console.error('❌ Connection failed:', error);
  }
  process.exit(0);
}

testConnection();
