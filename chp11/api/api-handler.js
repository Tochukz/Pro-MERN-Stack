const fs = require('fs');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');

const CustomDate = require('./custom-date.js');
const about = require('./about.js');
const issue = require('./issue.js');

const resolvers = {
  Query: {
    about: about.getMessage,
    issueList: issue.list,
    issue: issue.get,
  },
  Mutation: {
    setAboutMessage: about.setMessage,
    issueAdd: issue.add,
    issueUpdate: issue.update,
    issueDelete: issue.delete,
  },
  CustomDate,
};

/*
 * Since CustomDate is defined as  scalar type in the schema, graphql assigns a default resolver which uses toJSON() instead of toString().
 * So ommiting Custom type in the resolver object above creates no observable difference in the output of the query on Playground.
 *
 * toJSON() and toISOString() produces the same serializatiion using ISO 8601 format.
 */

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./schema.graphql', 'utf-8'),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

function installHandler(app) {
  const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
  console.log('CORS setting:', enableCors);
  server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
}

module.exports = { installHandler };
