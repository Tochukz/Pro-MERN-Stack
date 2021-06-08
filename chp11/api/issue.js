const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require('./db.js');

async function list(_, { status, effortMin, effortMax }) {
  const db = getDb();
  const filter = {};
  if (status) {
    filter.status = status;
  }
  if (effortMin !== undefined || effortMax !== undefined) {
    filter.effort = {};
    if (effortMin !== undefined) {
      filter.effort.$gte = effortMin;
      console.log('effortMin', effortMin);
    }
    if (effortMax !== undefined) {
      filter.effort.$lte = effortMax;
      console.log('effortMax', effortMax);
    }
    console.log('filter', filter);
  }
  const issues = await db.collection('issues').find(filter).toArray();
  return issues;
}

async function update(_, {id, changes }) {
  const db = getDb();
  if (changes.title || changes.status || changes.owner) {
    const issue = await db.collection('issues').findOne({ id });
    Object.assign(issue, changes);
    validate(issue);
  }
  await db.collection('issues').updateOne({ id }, { $set: changes });
  const savedIssue = await db.collection('issues').findOne({ id });
  return savedIssue;
}

async function remove(_, { id }) {
  const db = getDb();
  const issue = await db.collection('issues').findOne({ id });
  if (!issue) {
    return false;
  }
  issue.deleted = new Date();

  let result = await db.collection('deleted_issues').insertOne(issue);
  if (result.insertedId) {
    result = await db.collection('issues').removeOne({ id });
    return result.deletedCount === 1;
  }
  return false;
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

async function add(_, { issue }) {
  const db = getDb();
  validate(issue);
  const newIssue = Object.assign({}, issue);
  newIssue.created = new Date();
  newIssue.id = await getNextSequence('issues');
  const result = await db.collection('issues').insertOne(newIssue);
  const saveIssue = await db.collection('issues').findOne({ _id: result.insertedId });
 
  return saveIssue;
}

async function get(_, { id }) {
  const db = getDb();
  const issue = await db.collection('issues').findOne({ id });
  return issue;
}

module.exports = { list, add, get, update, delete: remove };

/** 
// To query the issueList with a status filter
query issues {
  issueList(status: Assigned) {
    _id
    title
    status
    
  }
}

*/

/**
// Query the issueList using graphQL playground
# The Query is 
query issueList (
  $status: StatusType
  $effortMin: Int 
  $effortMax: Int
) {
  issueList(
    status: $status 
    effortMin: $effortMin
    effortMax:$effortMax
  ) {
    id 
    title 
    status 
    owner 
    effort 
  }
}

# The Variables section will be 
{
  "status": "Assigned",
  "effortMin": 5,
  "effortMax": 10
}
# You may ommit the "effortMax" and "efforMin" as they are optional variables  

# To test the issueUpdate mutation, on the playground, use the named mutation  
mutation issueUpdate($id: Int!, $changes: IssueUpdateInputs!) {
  issueUpdate(id: $id, changes: $changes) {
    id 
    title 
    status 
    owner
    effort 
    created 
    due 
    description
 }
}
#And the query variable to go with it 
{ "id": 2, "changes": { "status": "Assigned", "owner":"Jacobo" } }

# TO test the Delete API using playgroung 
mutation {
  issueDelete(id: 4)
}
*/