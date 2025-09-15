// test-connection.js
// Run this with: node test-connection.js

const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://akshayachar10258_db_user:bm9kPcV2pVkBxBIw@bemypg.yjqgjyh.mongodb.net/BeMyPG?retryWrites=true&w=majority&appName=BeMyPG";

console.log('Testing connection to:', MONGO_URI);

mongoose.connect(MONGO_URI)
.then(() => {
  console.log("✅ Connection successful!");
  console.log("Host:", mongoose.connection.host);
  console.log("Database:", mongoose.connection.name);
  process.exit(0);
})
.catch(err => {
  console.error("❌ Connection failed:");
  console.error(err);
  process.exit(1);
});