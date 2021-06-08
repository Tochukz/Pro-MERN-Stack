import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import IssueList from './IssueList.jsx';
import IssueReport from './IssueReport.jsx';
import IssueEdit from './IssueEdit.jsx';

const NotFound = () => <h1>Page Not Fount</h1>;

export default function Contents() {
  return (
    <Switch>
      <Redirect exact from="/" to="/issues" />
      <Route path="/issues" component={IssueList} />
      <Route path="/edit/:id" component={IssueEdit} />
      <Route path="/report" component={IssueReport} />
      <Route component={NotFound} />
    </Switch>
  );
}

/*
 * React routing system matches route by regular expression by default.
 * So if the "exact" property is removed from the Redirect component, all the route will match the first one.
 * 
 * The match is a prefix match. For example the path / will match not only / but also /issues and /report.
 *  
 * A non-exact route matches full segments of the path, each segment being seperated by /.
 */