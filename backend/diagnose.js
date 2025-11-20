const mongoose = require('mongoose');
require('dotenv').config();

console.log('🔍 Diagnostic Test for MongoDB Connection\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Check environment variables
console.log('1️⃣ Environment Variables:');
console.log(`   MONGO_URI: ${process.env.MONGO_URI ? '✅ Set' : '❌ Not set'}`);
console.log(`   PORT: ${process.env.PORT || '3000'}`);
console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'development'}\n`);

// Parse connection string
console.log('2️⃣ Connection String Analysis:');
const uri = process.env.MONGO_URI;
if (uri) {
  console.log(`   Full URI: ${uri}`);
  const userMatch = uri.match(/mongodb\+srv:\/\/([^:]+):([^@]+)@/);
  console.log(`   Username: ${userMatch ? userMatch[1] : 'Not found'}`);
  console.log(`   Password: ${userMatch ? '***' : 'Not found'}`);
  const hostMatch = uri.match(/@([^/]+)/);
  console.log(`   Host: ${hostMatch ? hostMatch[1] : 'Not found'}`);
  const dbMatch = uri.match(/net\/([^?]+)/);
  console.log(`   Database: ${dbMatch ? dbMatch[1] : 'Not found'}\n`);
}

// Test connection
console.log('3️⃣ Testing Connection...');
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 5000,
})
  .then(() => {
    console.log('✅ Connection Successful!\n');
    console.log('4️⃣ MongoDB Status:');
    console.log(`   Ready State: ${mongoose.connection.readyState} (1 = Connected)`);
    console.log(`   Host: ${mongoose.connection.host}`);
    console.log(`   Port: ${mongoose.connection.port}`);
    console.log(`   Database: ${mongoose.connection.name}\n`);
    process.exit(0);
  })
  .catch((error) => {
    console.log('❌ Connection Failed!\n');
    console.log('4️⃣ Error Details:');
    console.log(`   Code: ${error.code}`);
    console.log(`   Message: ${error.message}\n`);
    console.log('5️⃣ Possible Solutions:');
    console.log('   • Add 0.0.0.0/0 to Network Access in MongoDB Atlas');
    console.log('   • Verify username and password are correct');
    console.log('   • Check if special characters need URL encoding');
    console.log('   • Ensure internet connection is active');
    console.log('   • Try a different network (mobile hotspot)\n');
    process.exit(1);
  });
