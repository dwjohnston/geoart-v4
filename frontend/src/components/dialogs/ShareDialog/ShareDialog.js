import React from 'react';
import { withStyles } from '@material-ui/core/styles';
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

// import ProgressBar from "./ProgressBar";
// import Toast from "./Toast";
import { withRouter } from 'react-router-dom';
import ClipboardJS from 'clipboard';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

const ShareDialog = ({ classes, isOpen, onClose, imageUrl, currentJpeg }) => {
    return (
        <Dialog className={classes.root} open={isOpen}>
            <DialogActions>
                <Button variant="fab" onClick={onClose}> x</Button>
            </DialogActions>


            <div className="share-header">
                <button className="btn btn-large btn-close" onClick={() => {
                    // this.setState({ toast: null });
                    //  onClose();
                }}>
                    <i className="fas fa-times"></i>
                </button>
            </div>

            <div className="share-buttons">

                <FacebookShareButton url={"https://geoplanets.io/" + imageUrl}> <FacebookIcon size={64} round={false} />  </FacebookShareButton>
                <TwitterShareButton url={"https://geoplanets.io/" + imageUrl}> <TwitterIcon size={64} round={false} />  </TwitterShareButton>
                <RedditShareButton url={"https://geoplanets.io/" + imageUrl}> <RedditIcon size={64} round={false} />  </RedditShareButton>

                {currentJpeg &&
                    <a className="" href={currentJpeg} download={imageUrl + ".png"}>
                        <button class="btn"> <i className="fas fa-download"></i></button>
                    </a>
                }


                {/* <a>  <button className="btn btn-copy" data-clipboard-text={this.state.url} onClick={
                    () => {
                        //    this.setState({ toast: Math.random() })
                    }
                }> <i className="fas fa-copy"></i></button></a> */}



            </div>

            {/* <Toast rand={this.state.toast}>URL copied!</Toast> */}


            <div className="share-image-container">
                {currentJpeg && <img src={currentJpeg} />}
            </div>
        </Dialog>
    );
};

const styles = {
    root: {},
};

export default withStyles(styles)(
    ShareDialog
);
