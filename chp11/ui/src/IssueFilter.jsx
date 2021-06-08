import React from 'react';
import { Button } from 'react-bootstrap';
import URLSearchParams from 'url-search-params';
import { withRouter } from 'react-router-dom';

class IssueFilter extends React.Component {
  constructor({ location: { search } }) {
    super();
    const params = new URLSearchParams(search);
    this.state = {
      status: params.get('status') || '',
      effortMin: params.get('effortMin') || '',
      effortMax: params.get('effortMax') || '',
      changed: false,
    };
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.showOriginalFilter = this.showOriginalFilter.bind(this);
    this.onChangeEffortMin = this.onChangeEffortMin.bind(this);
    this.onChangeEffortMax = this.onChangeEffortMax.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { location: { search: prevSearch } } = prevProps;
    const { location: { search } } = this.props;
    if (prevSearch !== search) {
      this.showOriginalFilter();
    }
  }

  onChangeStatus(e) {
    // const status = e.target.value;
    // const { history } = this.props;
    // history.push({
    //   pathname: '/issues',
    //   search: status ? `?status=${status}` : '',
    // });
    this.setState({ status: e.target.value, changed: true });
  }

  onChangeEffortMin(e) {
    console.log('change event triggered'); // eslint-disable-line no-console
    const effortString = e.target.value;
    if (effortString.match(/^\d*$/)) {
      this.setState({effortMin: e.target.value, changed: true});
    }
  }

  onChangeEffortMax(e) {
    const effortString = e.target.value;
    if (effortString.match(/^\d*$/)) {
      this.setState({effortMax: e.target.value, changed: true});
    }
  }

  showOriginalFilter() {
    const { location: { search } } = this.props;
    const params = new URLSearchParams(search);
    this.setState({
      status: params.get('status') || '',
      effortMin: params.get('effortMin') || '',
      effortMax: params.get('effortMax') || '',
      changed: false,
    })
  }

  applyFilter() {
    const { status, effortMin, effortMax } = this.state;
    const { history } = this.props; 
    const params = new URLSearchParams();
    if (status) {
      params.set('status', status);
    }
    if (effortMin) {
      params.set('effortMin', effortMin);
    }
    if (effortMax) {
      params.set('effortMax', effortMax);
    }
    const search = params.toString()? `${params.toString()}` : '';
    history.push({ pathname: '/issues', search });
  }

  render() {
    // const { location: { search } } = this.props;
    // const params = new URLSearchParams(search);
    const { status, changed, effortMin, effortMax } = this.state;
    return (
      <div>
        Status:
        {' '}
        <select onChange={this.onChangeStatus} value={status}>
          <option value="">All</option>
          <option value="Assigned">Assigned</option>
          <option value="Fixed">Fixed</option>
          <option value="Closed">Closed</option>
        </select>        
        {' '}
        Effort between:
        {' '}
        <input size={5} value={effortMin} onChange={this.onChangeEffortMin} />
        {' - '}
        <input size={5} value={effortMax} onChange={this.onChangeEffortMax} />
        {' '}
        <Button type="button" onClick={this.applyFilter} bsStyle="primary">
          Apply
        </Button>
        {' '}
        <Button type="button" onClick={this.showOriginalFilter} disabled={!changed}>
          Reset
        </Button>
      </div>
    );
  }
}

export default withRouter(IssueFilter);

/**
 * By Wrapping the IssueFilter Component with the withRouter component we inject the react router properties into the component.
 * By doing so we can access the location, history and query string properties of react router.
 */
