require('dotenv').config();
const { MongoClient } = require('mongodb');

let db;

async function connectToDb() {
  const connectionString = process.env.DB_URL || 'mongodb://localhost:27017/issuetracker';
  const client = new MongoClient(connectionString,
    { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  console.log('Connection established');
  db = client.db();
}

async function getNextSequence(name) {
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: name },
    { $inc: { current: 1 } },
    { returnOriginal: false },
  );
  // In mongo shell this option is called returnNewDocument and the default is false.
  return result.value.current;
}

function getDb() {
  return db;
}

module.exports = { connectToDb, getNextSequence, getDb };
