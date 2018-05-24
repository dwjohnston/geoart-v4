import React from 'react';
import PropTypes from 'prop-types';

class ProgressBar extends React.Component {
  render() {
    const { progress } = this.props;

    return <div className="progress-bar">
      <div className="file-progress-inner" style={{ width: (progress && progress * 100 + "%") }} />
    </div>;
  }
}

export default ProgressBar;
