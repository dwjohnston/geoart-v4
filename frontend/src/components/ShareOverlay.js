import React from 'react';
import PropTypes from 'prop-types';
// import MetaTags from "react-meta-tags";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon, 
  TwitterIcon,

} from 'react-share';

class ShareOverlay extends React.Component {


//   shareFb = () => {
//     FB.ui({
//   method: 'feed',
//   link: 'http://geoart.hyperactive.media',
//   caption: 'An example caption',
//   source: "https://s3-ap-southeast-2.amazonaws.com/dj-test-bucket/HJxXlO6BG.png"
// }, function(response){});
//   }



  render() {
    return <div className = {"share-overlay " + (this.props.visible ? "visible" : "") }>


    SHARE OVERLAY {this.props.imageUrl}
      <div className ="share-header">
        <h2> share </h2>
          <button className = "btn btn-large btn-close glyphicon glyphicon-remove" onClick = {this.props.onClose}>x</button> 
            {/* <button className = "btn btn-large " onClick = {this.shareFb}>fb </button> */}

          </div>

          <div className ="share-buttons">

            {/* <FacebookProvider appId="1231592460258402">
              <Share href="https://geoart.hyperactive.media">
                <button type="button">Share</button>
              </Share>
            </FacebookProvider>
            */}


            <FacebookShareButton url = {"https://geoart-v4.firebaseapp.com/"+ this.props.imageUrl}> <FacebookIcon size ={64} round = {false} />  </FacebookShareButton>
              <TwitterShareButton url = {"https://geoart-v4.firebaseapp.com/"+ this.props.imageUrl}> <TwitterIcon size ={64} round = {false} />  </TwitterShareButton>
                {this.props.currentJpeg &&  <a className = "btn btn-save btn-xlarge glyphicon glyphicon-download-alt" href = {this.props.currentJpeg} download = "hello.png"></a> }



                {this.props.currentJpeg &&  <a className = "btn btn-save btn-xlarge glyphicon glyphicon-download-alt" href = {this.props.currentJpeg} download = "hello.png"></a> }
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
