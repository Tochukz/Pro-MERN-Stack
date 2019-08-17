const issues = [
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

class IssueFilter extends React.Component {
  render() {
    return (
      <div>The is placeholder for the Isssue filter</div>
    )
  }
}

class IssueRow extends React.Component {
  render() {  
    const issue = this.props.issue;  
    return (      
      <tr>
        <td>{issue.id}</td>
        <td>{issue.status}</td>
        <td>{issue.owner}</td>
        <td>{issue.created.toDateString()}</td>
        <td>{issue.effort}</td>
        <td>{issue.due ? issue.due.toDateString() : ''}</td>
        <td>{issue.title}</td>
      </tr>
    )
  }
}

class IssueTable extends React.Component {
  render() {   
    const issueRows = issues.map(issue => <IssueRow issue={issue} key={issue.id} />);
    return (
      <table className="table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Effort</th>
            <th>Created</th>
            <th>Due Date</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {issueRows}
        </tbody>
      </table>
    )
  }
}

class IssueAdd extends React.Component {
  render() {
    return (
      <div>This is palceholder for the Issue Add</div>
    )
  }
}

class IssueList extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr />
        <IssueTable />
        <hr />
        <IssueAdd />
      </React.Fragment>
    )
  }
}

const element = <IssueList />;

ReactDOM.render(element, document.getElementById('content'));