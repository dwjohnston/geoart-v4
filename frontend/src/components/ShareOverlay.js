import React from 'react';
import PropTypes from 'prop-types';
// import MetaTags from "react-meta-tags";
import {
  FacebookShareButton,
  TwitterShareButton,
  RedditShareButton,
  RedditIcon,
  FacebookIcon,
  TwitterIcon,

} from 'react-share';

import ProgressBar from "./ProgressBar";
import Toast from "./Toast";
import { withRouter } from 'react-router-dom';
import ClipboardJS from 'clipboard';
class ShareOverlay extends React.Component {


  constructor() {
    super();
    this.state = {
      toast: null,
      url: window.location.href,
    };
  }


  componentDidMount() {
    new ClipboardJS('.btn-copy');
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ url: window.location.href });
  }

  render() {
    return <div className={`share-overlay ${this.props.visible ? 'visible' : ''} ${this.props.imageUrl ? 'image-ready' : ''}`}>


      <ProgressBar progress={this.props.progress} />

    </div>







  }
}

ShareOverlay.displayName = 'ShareOverlay';
ShareOverlay.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
ShareOverlay.defaultProps = {
  visible: false,
};

export default withRouter(ShareOverlay);
