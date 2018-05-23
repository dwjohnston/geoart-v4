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
    return <div className = {`share-overlay ${this.props.visible ? 'visible' : ''} ${this.props.imageUrl? 'image-ready' : ''}`}>


    <ProgressBar progress = {this.props.progress}/> 

    SHARE OVERLAY {this.props.imageUrl}
      <div className ="share-header">
        <h2> share </h2>
          <button className = "btn btn-large btn-close glyphicon glyphicon-remove" onClick = {this.props.onClose}>
            <i className="fas fa-times"></i>
          </button> 
      </div>

      <div className ="share-buttons">

            <FacebookShareButton url = {"https://geoart-v4.firebaseapp.com/"+ this.props.imageUrl}> <FacebookIcon size ={64} round = {false} />  </FacebookShareButton>
              <TwitterShareButton url = {"https://geoart-v4.firebaseapp.com/"+ this.props.imageUrl}> <TwitterIcon size ={64} round = {false} />  </TwitterShareButton>
                {this.props.currentJpeg &&  
                <a className = "btn btn-save btn-xlarge glyphicon glyphicon-download-alt" href = {this.props.currentJpeg} download = "hello.png">
                  <i className="fas fa-download"></i>
                </a> 
                }

                </div>

              <div className = "share-image-container">

                {this.props.currentJpeg && <img src = {this.props.currentJpeg}/> }
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
