const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/issuetracker';
function tryMongoWithCallbacks(callback) {
  const client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true });
  client.connect((conError) => {
    if (conError !== null) {
      callback(`Connection failed: ${conError}`);
      return false;
    }
    const db = client.db();
    const employee = {
      id: 2,
      name: {
        first: 'Emukus',
        last: 'Ekimba',
      },
      age: 27,
    };
    db.collection('employees').insertOne(employee, (insertError, result) => {
      if (insertError) {
        client.close();
        callback(`insertOne operatin failed: ${insertError}`);
        return false;
      }
      console.log('Result ID:\n', result.insertedId);

      db.collection('employees').find({ _id: result.insertedId }).toArray((findError, docs) => {
        if (findError) {
          client.close();
          callback(`find operation failed: ${findError}`);
          return false;
        }
        client.close();
        callback(`Fullname: ${docs[0].name.first} ${docs[0].name.last}`);
        return true;
      });
      return true;
    });
    return true;
  });
}

function printFullname(output) {
  console.log(output);
}


tryMongoWithCallbacks(printFullname);
