import React from 'react';
import PropTypes from 'prop-types';
// import MetaTags from "react-meta-tags";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,

} from 'react-share';

import ProgressBar from "./ProgressBar";

class ShareOverlay extends React.Component {

  render() {
    return <div className={`share-overlay ${this.props.visible ? 'visible' : ''} ${this.props.imageUrl ? 'image-ready' : ''}`}>


      <ProgressBar progress={this.props.progress} />
      <div className="share-header">
        <button className="btn btn-large btn-close" onClick={this.props.onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="share-buttons">

        <FacebookShareButton url={"https://geoart-v4.firebaseapp.com/" + this.props.imageUrl}> <FacebookIcon size={64} round={false} />  </FacebookShareButton>
        <TwitterShareButton url={"https://geoart-v4.firebaseapp.com/" + this.props.imageUrl}> <TwitterIcon size={64} round={false} />  </TwitterShareButton>
        {this.props.currentJpeg &&
          <a className="" href={this.props.currentJpeg} download="hello.png">
            <button class="btn"> <i className="fas fa-download"></i></button>
          </a>
        }

      </div>

      <div className="share-image-container">
       {this.props.currentJpeg && <img src={this.props.currentJpeg} />}
      </div>
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

export default ShareOverlay;
