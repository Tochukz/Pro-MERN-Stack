require('dotenv').config();
const { MongoClient } = require('mongodb');

const url = process.env.DB_URL || 'mongodb://localhost:27017/issuetracker';
async function tryMongoWithAsync(){
  const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});
  try {    
    await client.connect();
    console.log(`Connection established at ${url}!`);

    const db = client.db();
    const employee = {
      id: 31,
      name: {
        first: 'Godon',
        last: 'James'
      },
      age: 44,
    };

    const inserted = await db.collection('employees').insertOne(employee);
    console.log('Inserted: ', inserted.insertedId);

    const theEmployee =  await db.collection('employees').find({_id: inserted.insertedId}).toArray();
    console.log(theEmployee);

  } catch(err) {
     console.error(err);
  } finally {
    client.close();
  }
}

tryMongoWithAsync();
