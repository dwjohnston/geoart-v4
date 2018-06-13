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


  constructor () {
    super(); 
    this.state = {
      toast: null, 
      url : window.location.href, 
    };
  }


  componentDidMount() {
    new ClipboardJS('.btn-copy');
  }

  componentWillReceiveProps(nextProps) {
    this.setState({url: window.location.href}); 
  }

  render() {
    return <div className={`share-overlay ${this.props.visible ? 'visible' : ''} ${this.props.imageUrl ? 'image-ready' : ''}`}>


      <ProgressBar progress={this.props.progress} />
      <div className="share-header">
        <button className="btn btn-large btn-close" onClick={() =>{
          this.setState({toast:null}); 
          this.props.onClose();
        }}>
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="share-buttons">

        <FacebookShareButton url={"https://geoart-v4.firebaseapp.com/" + this.props.imageUrl}> <FacebookIcon size={64} round={false} />  </FacebookShareButton>
        <TwitterShareButton url={"https://geoart-v4.firebaseapp.com/" + this.props.imageUrl}> <TwitterIcon size={64} round={false} />  </TwitterShareButton>
        <RedditShareButton url={"https://geoart-v4.firebaseapp.com/" + this.props.imageUrl}> <RedditIcon size={64} round={false} />  </RedditShareButton>

        {this.props.currentJpeg &&
          <a className="" href={this.props.currentJpeg} download="hello.png">
            <button class="btn"> <i className="fas fa-download"></i></button>
          </a>
        }

          
           <a>  <button className="btn btn-copy"  data-clipboard-text={this.state.url} onClick = {
              () =>{
                this.setState({toast: Math.random()})
                console.log(this.props.history); 
                console.log(window.location.href); 
              }
            }> <i className="fas fa-copy"></i></button></a> 



      </div>

      <Toast rand = {this.state.toast}>URL copied!</Toast> 


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

export default withRouter(ShareOverlay);
