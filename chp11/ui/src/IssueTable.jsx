import React from 'react';
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { BsFillXCircleFill, BsTrashFill } from 'react-icons/bs';
import { Link, NavLink, withRouter } from 'react-router-dom';

const IssueRow = withRouter(({ issue, location: { search }, closeIssue, deleteIssue, index, }) => {
  const selectLocation = { pathname: `/issues/${issue.id}`, search };
  const closeTooltip = (
    <Tooltip id="close-tooltip" placement="top">Close Issue</Tooltip>
  );
  const deleteToolTip = (
    <Tooltip id="delete-tooltip" placement="top">Delete Issue</Tooltip>
  );
  return (
    <tr>
      <td>{issue.id}</td>
      <td>{issue.status}</td>
      <td>{issue.owner}</td>
      <td>{issue.created.toDateString()}</td>
      <td>{issue.effort}</td>
      <td>{issue.due ? issue.due.toDateString() : ' '}</td>
      <td>{issue.title}</td>
      <td>
        <Link to={`/edit/${issue.id}`}>Edit</Link>
        {' | '}
        <NavLink to={selectLocation}>Select</NavLink>
        {' | '}
        <OverlayTrigger delayShow={1000} overlay={closeTooltip}>
          <Button onClick={() => { closeIssue(index); }} bsStyle="xsmall">
            <BsFillXCircleFill />
          </Button>
        </OverlayTrigger>
        {'  '}
        <OverlayTrigger delayShow={1000} overlay={deleteToolTip}>
          <Button onClick={() => { deleteIssue(index); }} bsStyle="xsmall">
            <BsTrashFill />
          </Button>
        </OverlayTrigger>
      </td>      
    </tr>
  );
})

export default function IssueTable({ issues, closeIssue, deleteIssue }) {
  const issueRows = issues.map((issue, index) => 
        <IssueRow 
          issue={issue}
          key={issue.id}
          closeIssue={closeIssue} 
          deleteIssue={deleteIssue}
          index={index}
        />
  );

  return (
    <table className="table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Created</th>
          <th>Effort</th>
          <th>Due Date</th>
          <th>Title</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {issueRows}
      </tbody>
    </table>
  );
};