import React from "react";
import { Canvas, CanvasCore, CanvasLayer } from "blacksheep-react-canvas";
import {
  Test,
  GeoPlanets,
  Flowers,
  GeoPlanetsTwo,
  ThreeOrbits,
  NGeo,
  Strings,
  ThreeOrbitsGeo,
  EarthVenus,
  TestTwo
} from "geoplanets-model";
import SimpleCarousel from "blacksheep-react-carousel";
import ShareOverlay from "./ShareOverlay";
import AlgorithmControls from "./AlgorithmControls";
import Contact from "./Contact";
import { withStyles } from '@material-ui/core/styles';

import fireApp from "../store/google-store";
import firebase from "firebase";
import HelpOverlay from "./HelpOverlay";

import _ from "lodash";

import { withRouter } from "react-router-dom";

import shortid from "shortid";
import GlobalControls from "./GlobalControls";
import Header from "./layout/Header/Header";
const version = "1.21";

class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      showShareDialog: false,
      uploadProgress: 0
    };
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
      new Flowers()
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

  componentDidMount() { }

  componentDidUpdate() { }

  handleGetJpeg(v) {
    this.setState({
      currentJpeg: v.image,
      showShareDialog: true,
      uploadProgress: 0
    });

    let id = shortid.generate();
    let ref = fireApp.storage().ref(id + ".png");

    let upload = ref.putString(v.image, "data_url", {
      contentType: "image/png",
      customMetadata: {
        width: v.width,
        height: v.height
      }
    });

    upload.then(d => {
      this.setState({
        imageUrl: id,
        uploadProgress: 1
      });
      this.props.history.push("/" + id);
    });

    upload.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
      this.setState({
        uploadProgress:
          0.1 + (snapshot.bytesTransferred / snapshot.totalBytes) * 0.8
      });
    });
  }

  closeShare = () => {
    this.setState({
      showShareDialog: false,
      currentJpeg: false,
      imageUrl: false
    });
  };

  share = () => {
    let core = this.state.canvasCore;
    core.requestJpeg();
    this.setState({
      uploadProgress: 0.1
    });
  };

  getJpeg = v => {
    this.handleGetJpeg(v);
  };

  changeAlgorithm = v => {
    let core = this.state.canvasCore;
    core.setDrawingSource(v);
    //v.onChange();
    v.requestClear();
    v.randomize();
    this.setState({ canvasCore: core });
    this.setState({ algorithm: v });
  };

  handleGlobalEvent = algo => {
    this.setState({ algorithm: algo });
  };

  render() {

    const { classes } = this.props;

    return (
      <main className="index" className={classes.root}>

        <Header className={classes.header} />

        <div className={classes.canvas}>
          <Canvas
            id="test-canvas"
            canvasCore={this.state.canvasCore}
            layers={[
              new CanvasLayer(this.state.algorithm.baseColor.getValue()),
              new CanvasLayer(this.state.algorithm.baseColor.getValue())
            ]}
            getJpeg={this.getJpeg}
          />
        </div>
        <GlobalControls
          className={classes.globalControls}
          algorithm={this.state.algorithm}
          onEvent={this.handleGlobalEvent}
        />

        <div className={classes.controls}>
          <SimpleCarousel
            sourceObjects={this.algorithms}
            labelFn={v => {
              return v.label;
            }}
            name="algorithmsSelector"
            onChange={this.changeAlgorithm}
          />

          <AlgorithmControls algorithm={this.state.algorithm} />
          <Contact />
        </div>

        <footer className={classes.footer} />
      </main>
    );
  }
}

AppComponent.defaultProps = {};


const styles = {
  root: {
    height: "100%",
    display: "grid",
    gridTemplateColumns: "auto 30px",
    gridTemplateRows: "auto 1fr 200px 15px",
    gridTemplateAreas: '"header header" "canvas global" "controls controls" "footer footer"'
  },
  header: {
    border: "solid 1px black",
    gridArea: "header",
  },
  canvas: {
    gridArea: "canvas",
    position: "relative",

    "& canvas": {
      position: "absolute",
    }
  },
  globalControls: {
    gridArea: "global",
  },
  controls: {
    gridArea: "controls",
  },
  footer: {
    gridArea: "footer"
  },
}

export default withRouter(withStyles(styles)(AppComponent));
