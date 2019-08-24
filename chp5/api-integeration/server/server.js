const fs = require('fs');
const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind }  = require('graphql/language');

let aboutMessage = "Issue Tracer API v1.0";

const issuesDB = [
  {
    id: 1,
    status: 'New',
    owner: 'Ravan',
    effort: 5,
    created: new Date('2018-08-15'),
    due: undefined,
    title: 'Error in console when clicking Add',
  },
  {
    id: 2,
    status: 'Assigned',
    owner: 'Eddie',
    effort: 14, 
    created: new Date('2018-08-16'),
    due: new Date('2018-08-30'),
    title: 'Missing botton border on panel',
  }
];

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

function issueList() {
  return issuesDB;
}

function issueAdd(_, { issue }) {
  issueValidate(issue);
  issue.created = new Date();
  issue.id = issuesDB.length + 1;
  issuesDB.push(issue);
  return issue;
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
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  }
});

const app = express();

app.use(express.static('public'));

server.applyMiddleware({app, path: '/graphql'});

app.listen(3000, function() {
  console.log('App started on port 3000');
})

/*
Mutation to add add issue and display some of the returned fields.

mutation {
  issueAdd(issue: { title: "Robot fails", owner: "Tochukwu", effort: 9, due: "2018-12-13",}) {
      id
      due
      created
      status
  }
}

GraphQL mutation using Query Variable in playground interface  

In the input panel do 
mutation  setAboutMessage($message: String!) {
   setAboutMessage(message: $message)
}

In the QUERY VARIABLE panel on the bottom right do
{
  "message": "Hello world"
}
*/