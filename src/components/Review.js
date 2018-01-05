
import React, {Component}     from 'react'
import PropTypes              from 'prop-types';

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      prayeralerts: '',
      moments: '',
      updates: '',
      cell: ''
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { name, prayeralerts, moments, updates, cell} = steps;

    this.setState({ name, prayeralerts, moments, updates, cell });
  }

  render() {
    const { name, prayeralerts, moments, updates, cell } = this.state;
    return (
      <div style={{ width: '100%' }}>
        <h3>Summary</h3>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{name.value}</td>
            </tr>
            <tr>
              <td>Prayer Alerts</td>
              <td>{prayeralerts.value}</td>
            </tr>
            <tr>
              <td>Updates</td>
              <td>{updates.value}</td>
            </tr>
            <tr>
              <td>Moments</td>
              <td>{moments.value}</td>
            </tr>
            <tr>
              <td>Cell</td>
              <td>{cell.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};


export default Review
