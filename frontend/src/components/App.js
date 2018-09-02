import React from 'react';
import { Canvas, CanvasCore, CanvasLayer } from 'blacksheep-react-canvas';
import { Test, GeoPlanets, Flowers, GeoPlanetsTwo, ThreeOrbits, NGeo, Strings, ThreeOrbitsGeo, EarthVenus, TestTwo } from "geoplanets-model";
import SimpleCarousel from 'blacksheep-react-carousel';
import ShareOverlay from "./ShareOverlay";
import AlgorithmControls from "./AlgorithmControls";
import Contact from "./Contact";

import fireApp from "../store/google-store";
import firebase from 'firebase';
import HelpOverlay from "./HelpOverlay";

import _ from 'lodash';

import { withRouter } from 'react-router-dom';

import shortid from "shortid";
import GlobalControls from './GlobalControls';


const version = "1.21";

class AppComponent extends React.Component {


  constructor() {
    super();
    this.state = {
      showShareDialog: false,
      uploadProgress: 0,
    }
  }


  componentWillMount() {


    this.algorithms = [
      new ThreeOrbits(),

      new TestTwo(),
      new Strings(),

      new ThreeOrbitsGeo(),
      new EarthVenus(),
      //new GeoPlanets(),
      new GeoPlanetsTwo(),
      new NGeo(),
      //new Test(),
      new Flowers(),
    ];

    let core = new CanvasCore("#000000", 0.04, 2);
    //let firstIndex = _.random(0, this.algorithms.length -1, 0); 
    let firstIndex = 0;
    let algo = this.algorithms[firstIndex];

    core.setDrawingSource(algo);
    algo.randomize();
    this.setState({
      canvasCore: core,
      algorithm: algo
    });

  }


  componentDidMount() {


  }

  componentDidUpdate() {

  }


  handleGetJpeg(v) {

    this.setState({
      currentJpeg: v.image,
      showShareDialog: true,
      uploadProgress: 0,
    });

    let id = shortid.generate();
    let ref = fireApp.storage().ref(id + ".png");

    let upload = ref.putString(v.image, 'data_url', {
      contentType: 'image/png',
      customMetadata: {
        width: v.width,
        height: v.height,
      }
    });

    upload.then(s => {
      return fetch("/makepublic", {
        method: "POST",
        body: JSON.stringify({
          id: id,
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
    }).then(d => {
      this.setState({
        imageUrl: id,
        uploadProgress: 1,
      });
      this.props.history.push("/" + id);
    });

    upload.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
      this.setState({
        uploadProgress: 0.1 + (snapshot.bytesTransferred / snapshot.totalBytes) * 0.8
      })
    });
  }


  closeShare = () => {
    this.setState({
      showShareDialog: false,
      currentJpeg: false,
      imageUrl: false,
    });
  }

  share = () => {

    let core = this.state.canvasCore;
    core.requestJpeg();
    this.setState({
      uploadProgress: 0.1,
    });
  }

  getJpeg = (v) => {
    this.handleGetJpeg(v);
  }

  changeAlgorithm = (v) => {
    let core = this.state.canvasCore;
    core.setDrawingSource(v);
    //v.onChange();
    v.requestClear();
    v.randomize();
    this.setState({ canvasCore: core });
    this.setState({ algorithm: v });
  }

  handleGlobalEvent = (algo) => {
    this.setState({ algorithm: algo });
  }


  render() {

    return (
      <div className="index">

        <header>
          <HelpOverlay />
          <span className="build-num">
            geoplanets.io {version}
          </span>

          <button className="btn btn-share" onClick={this.share}><i className="fas fa-share-alt"></i><span> share your creation</span>
          </button>

        </header>

        <ShareOverlay
          visible={this.state.showShareDialog}
          currentJpeg={this.state.currentJpeg}
          imageUrl={this.state.imageUrl}
          progress={this.state.uploadProgress}
          onClose={this.closeShare} />

        <div className="canvas-container">
          <Canvas id="test-canvas"
            canvasCore={this.state.canvasCore}
            layers={[new CanvasLayer(this.state.algorithm.baseColor.getValue()), new CanvasLayer(this.state.algorithm.baseColor.getValue())]}
            getJpeg={this.getJpeg}
          />
        </div>
        <GlobalControls algorithm={this.state.algorithm} onEvent={this.handleGlobalEvent} />

        <div className="controls">
          <SimpleCarousel
            sourceObjects={this.algorithms}
            labelFn={(v) => { return v.label; }}
            name="algorithmsSelector"
            onChange={this.changeAlgorithm} />

          <AlgorithmControls
            algorithm={this.state.algorithm}

          />
          <Contact />
        </div>

        <footer></footer>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default withRouter(AppComponent);
