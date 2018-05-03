import React from 'react';
import PropTypes from 'prop-types';
//import MetaTags from "react-meta-tags";
//import {ShareButtons, generateShareIcon} from 'react-share';
//import FacebookProvider, { Share } from 'react-facebook';

// const {
//   FacebookShareButton,
//   TwitterShareButton,
//   RedditShareButton,
//   TumblrShareButton,

// } = ShareButtons;

// const FacebookIcon = generateShareIcon("facebook");
// const TwitterIcon = generateShareIcon("twitter");


class ShareOverlay extends React.Component {


//   shareFb = () => {
//     FB.ui({
//   method: 'feed',
//   link: 'http://geoart.hyperactive.media',
//   caption: 'An example caption',
//   source: "https://s3-ap-southeast-2.amazonaws.com/dj-test-bucket/HJxXlO6BG.png"
// }, function(response){});
//   }


shareFb = () => {

}

  render() {
    return <div className = {"share-overlay " + (this.props.visible ? "visible" : "") }>


    SHARE OVERLAY
{/*
      <MetaTags>
        {this.props.imageUrl && <meta property = "og:image" content = {this.props.imageUrl}/>  }
      </MetaTags>

      <div className ="share-header">
        <h2> share </h2>
          <button className = "btn btn-large btn-close glyphicon glyphicon-remove" onClick = {this.props.onClose}/>
            <button className = "btn btn-large " onClick = {this.shareFb}>fb </button>

          </div>

          <div className ="share-buttons">

            <FacebookProvider appId="1231592460258402">
              <Share href="https://geoart.hyperactive.media">
                <button type="button">Share</button>
              </Share>
            </FacebookProvider>


            <FacebookShareButton url = "https://geoart.hyperactive.media"> <FacebookIcon size ={64} round = {false} />  </FacebookShareButton>
              <TwitterShareButton url = "https://geoart.hyperactive.media"> <TwitterIcon size ={64} round = {false} />  </TwitterShareButton>
                {this.props.currentJpeg &&  <a className = "btn btn-save btn-xlarge glyphicon glyphicon-download-alt" href = {this.props.currentJpeg} download = "hello.png"></a> }

              </div>


              <div className = "share-image-container">

                {this.props.currentJpeg && <img src = {this.props.currentJpeg}/> }
              </div>*/}
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
