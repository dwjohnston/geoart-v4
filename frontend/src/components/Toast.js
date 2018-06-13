import React from 'react';
import PropTypes from 'prop-types';

class Toast extends React.Component {

  constructor() {
    super(); 

    this.state = {
      visible: false
    }; 
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.rand){
      this.setState({visible: true});
      setTimeout(() => {
        this.setState({visible: false});
      }, 3000);
    }

  }

  render() {

    return <div className="toast-container">

    {this.state.visible}
      {this.state.visible && <div className = "toast">{this.props.children}</div>         
      }
    </div>;
  }
}

export default Toast;
