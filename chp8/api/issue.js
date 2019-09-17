const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require('./db.js');

async function list() {
  const db = getDb();
  const issues = await db.collection('issues').find({}).toArray();
  return issues;
}

function validate(issue) {
  const errors = [];
  if (issue.title.length < 3) {
    errors.push('Field "title" must be at least 3 characters long.');
  }
  if (issue.status === 'Assigned' && !issue.owner) {
    errors.push('Field "owner" is required when status is "Assigned');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

async function add(_, { newIssue }) {
  const db = getDb();
  validate(newIssue);
  const issue = Object.assign({}, newIssue);
  issue.created = new Date();
  issue.id = await getNextSequence('issues');
  const result = await db.collection('issues').insertOne(issue);
  const saveIssue = await db.collection('issues').findOne({ _id: result.insertedId });
  return saveIssue;
}

module.exports = { list, add };
