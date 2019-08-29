const { MongoClient} = require('mongodb');

const url = 'mongodb://localhost:27017/issuetracker';
function tryMongoWithCallbacks(callback) {
  const client = new MongoClient(url, {useUnifiedTopology: true, useNewUrlParser: true });
  client.connect(function(err, client){
    if (err !== null){
      callback(`Connection failed: ${err}`);
      return false;
    }
    const db = client.db();
    const employee = {
      id: 2,
      name: {
        first: 'Emukus',
        last: 'Ekimba',
      },
      age: 27
    };
    db.collection("employees").insertOne(employee, function(err, result){
      if (err) {
        client.close();
        callback(`insertOne operatin failed: ${err}`);
        return false;
      }
      console.log('Result ID:\n', result.insertedId);

      db.collection("employees").find({_id: result.insertedId}).toArray(function(err, docs){
        if(err) {
          client.close();
          callback(`find operation failed: ${err}`);
          return false;
        }
        client.close();
        callback(`Fullname: ${docs[0].name.first} ${docs[0].name.last}`);
      });
    });
  });
}

function printFullname(output) {
  console.log(output);
}


tryMongoWithCallbacks(printFullname);
