const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URI);
let db;

async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db(); // usa o nome do banco vindo da URI
    console.log('✅ MongoDB conectado');
  }
  return db;
}

module.exports = connectDB;
