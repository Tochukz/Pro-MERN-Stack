class IssueFilter extends React.Component {  
  render() {
    return (
      <div>The is placeholder for the Isssue filter</div>
    )
  }
}

const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');
function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) {
    return new Date(value)
  }
  return value;
}

async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({query, variables})
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code == 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    /** Transport error handling*/
    alert(`Error in sending data to server: ${e.message}`);
  }
}

function IssueRow(props) {  
  const issue = props.issue;  

  return (      
    <tr>
      <td>{issue.id}</td>
      <td>{issue.status}</td>
      <td>{issue.owner}</td>
      <td>{issue.created.toDateString()}</td>
      <td>{issue.effort}</td>
      <td>{issue.due ? issue.due.toDateString() : ' '}</td>
      <td>{issue.title}</td>
    </tr>
  );
}

function IssueTable(props) {   
  const issueRows = props.issues.map(issue => <IssueRow issue={issue} key={issue.id} />);
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
  );
}

class IssueAdd extends React.Component {
  constructor() {
    super();   
    this.handleSubmit =  this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.issueAdd;
    const tenDays = 10*1000*60*60*24
    const issue = {
      owner: form.owner.value,
      title: form.title.value,
      due: new Date(new Date().getTime() + tenDays),
    }
    this.props.createIssue(issue);
    form.owner.value = "";
    form.title.value = "";
  }
  render() {
    return (
      <form name="issueAdd" onSubmit={this.handleSubmit}>
        <input type="text" name="owner" placeholder="Owner" />
        <input type="text" name="title" placeholder="Title" />
        <button>Add</button>
      </form>
    )
  }
}

class IssueList extends React.Component {
  constructor() {
    super();
    this.state = {issues: []};
    this.createIssue = this.createIssue.bind(this);
  }
  componentDidMount() {
      this.loadData();
  }
  async loadData() {
    const query = `query {
       issueList {
         id
         title
         status
         owner
         created 
         effort         
         due        
       }
    }`;
    /*
    const response = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query  })
    });    
    //const result = await response.json();
    const resultString = await response.text();
    const result = JSON.parse(resultString, jsonDateReviver);
    this.setState({ issues: result.data.issueList});
    */
   const data = await graphQLFetch(query);
   if (data) {
     this.setState({issues: data.issueList});
   }
  }
  async createIssue(issue) {
    /** Passing values as literals */
    /*
    const query = `
      mutation {
        issueAdd(issue: {title: "${issue.title}", owner: "${issue.owner}", due: "${issue.due.toISOString()}"}) {
          id
        }
      }
    `;
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({query})
    });
    */

    /** Using Query variable */
    const query = `mutation issueAdd($issue: IssueInputs!) {
        issueAdd(issue: $issue) {
          id
        }
    }`;
    /*
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ query, variables: {issue} })
    })
    this.loadData();
    */
   const data = await graphQLFetch(query, { issue });
   if (data) {
     this.loadData();
   }
  }
  render() {
    return (
      <React.Fragment>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr />
        <IssueTable issues={this.state.issues} />
        <hr />
        <IssueAdd createIssue={this.createIssue} />
      </React.Fragment>
    )
  }
}

const element = <IssueList />;

ReactDOM.render(element, document.getElementById('content'));