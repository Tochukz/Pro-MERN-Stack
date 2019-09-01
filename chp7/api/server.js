require('dotenv').config();
const fs = require('fs');
const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind }  = require('graphql/language');
const { MongoClient } = require('mongodb');

let aboutMessage = "Issue Tracer API v1.0";

const connectionString = process.env.DB_URL || 'mongodb://localhost:27017/issuetracker';
let db;

async function issueList() {
  const issues = await db.collection('issues').find({}).toArray();
  return issues;
}

async function connectToDb(){
  const client = new MongoClient(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
  await client.connect();
  console.log('Connection established');
  db = client.db();
}

async function getNextSequence(name) {
  const result = await db.collection('counters').findOneAndUpdate (
    {_id: name},
    { $inc: {current: 1}},
    { returnOriginal: false},
  );
  //In mongo shell this option is called returnNewDocument and the default is false.
  return result.value.current;
}


const CustomDate = new GraphQLScalarType({
  name: 'CustomDate',
  description: 'A custom scalar type foor date',
  serialize(value) {    
    return value.toISOString();
  },
  parseValue(value) { 
    /** This function will be called when the value on the client side in a mutatiion is passed as variables */
    const dateValue = new Date(value);
    return isNaN(dateValue) ?  undefined : dateValue;
    // Returning undefined is treated as an error by the library.
  },
  parseLiteral(ast) { 
    /** This function will be called when the value on the client side in a mutation is passed as a literal */
    if (ast.kind == Kind.STRING) { 
      const value = new Date(ast.value);
      return isNaN(value) ? undefined : value
    }
    // Returning nothing is same as returning undefined.
  },
});

const resolvers = {
  Query: {
    about: () => aboutMessage,
    issueList,
  },
  Mutation: {
    setAboutMessage,
    issueAdd,
  },
  CustomDate,
}
/* 
 * Since CustomDate is defined as  scalar type in the schema, graphql assigns a default resolver which uses toJSON() instead of toString().
 * So ommiting Custom type in the resolver object above creates no observable difference in the output of the query on Playground.
 * 
 * toJSON() and toISOString() produces the same serializatiion using ISO 8601 format.
 */
function setAboutMessage(_, { message}){
  return aboutMessage = message;
}

async function issueAdd(_, { issue }) {
  const errors = [];
  issueValidate(issue);
  issue.created = new Date();
  issue.id = await getNextSequence('issues');
  const result = await db.collection('issues').insertOne(issue);
  const saveIssue = await db.collection('issues')
                            .findOne({_id: result.insertedId});
  return saveIssue;
}

function issueValidate(issue) {
  const errors = [];
  if (issue.title.length < 3) {
    errors.push('Field "title" must be at least 3 characters long.');
  }
  if (issue.status == 'Assigned' && !issue.owner) {
    errors.push('Field "owner" is required when status is "Assigned');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./schema.graphql', 'utf-8'),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  }
});

const app = express();

server.applyMiddleware({app, path: '/graphql'});

const port = process.env.API_SERVER_PORT || 3000;
(async function(){
  try {
    await connectToDb();
    app.listen(port, function() {
      console.log(`API server started on port ${port}`);
    });    
  } catch (err) {
    console.log('Error: ', err)
  }
})()
