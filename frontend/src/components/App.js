import React from 'react';
import { Canvas, CanvasCore, Circle, Color, Position, CanvasLayer } from 'blacksheep-react-canvas';
//import FacebookProvider, { Share } from 'react-facebook';
import Parameter from '../model/Parameter';
import ThreePlanets from "../model/algorithms/ThreePlanets";
import GeoPlanets from "../model/algorithms/GeoPlanets";
import NestedPolygons from "../model/algorithms/NestedPolygons";
import EarthVenus from "../model/algorithms/EarthVenus";
import ThreeOrbits from "../model/algorithms/ThreeOrbits";
import NPlanets from "../model/algorithms/NPlanets";
import BasicOrbits from "../model/algorithms/BasicOrbits";
import RecursiveOrbits from "../model/algorithms/RecursiveOrbits";
import GoldenRectangle from "../model/algorithms/GoldenRectangle";
import SimpleCarousel from 'blacksheep-react-carousel';
import ShareOverlay from "./ShareOverlay";
import AlgorithmControls from "./AlgorithmControls";

import fireApp from "../store/google-store"; 
import firebase from 'firebase';

import shortid from "shortid"; 


//import * as _ from 'lodash';  //mark for deletion

//import 'bootstrap/dist/css/bootstrap.min.css';

console.log(CanvasLayer);

class AppComponent extends React.Component {


  constructor() {
    super();
    //


    this.state = {
      showShareDialog: false,
    }
  }

  algorithmHasChanged() {
    /**I very much feel like i'm getting into callback hell here.**/
    this.setState({ changeTrigger: Math.random() });
  }

  componentWillMount() {


    this.algorithms = [
      new ThreeOrbits(() => this.algorithmHasChanged()),
      new EarthVenus(() => this.algorithmHasChanged()),
      new GeoPlanets(() => this.algorithmHasChanged()),
      new NestedPolygons(() => this.algorithmHasChanged()),
      new GoldenRectangle(() => this.algorithmHasChanged()),
      new NPlanets(() => this.algorithmHasChanged()),
      new RecursiveOrbits(() => this.algorithmHasChanged()),
    ];

    let core = new CanvasCore("#000000", 0.04, 2);
    core.setDrawingSource(this.algorithms[0]);

    this.setState({
      canvasCore: core,
      algorithm: this.algorithms[0]
    });
  }


  componentDidMount() {


  }

  componentDidUpdate() {

  }


  handleGetJpeg(v) {

    this.setState({
      currentJpeg: v.image,
      showShareDialog: true
    });

    let ref = fireApp.storage().ref();

    let id; 
    async function getUnusedId() {

      id = shortid.generate(); 
      let file = ref.child((id + ".png")); 
      console.log(file); 
      
      try {
        let md =  await file.getMetadata();
        return getUnusedId(); 
      }
      catch(e) {
        return file; 
      }

    }
    getUnusedId().then(ref =>{

        let md = {
          contentType: 'image/jpeg',
        };
       let upload = ref.putString(v,'data_url', md);


       upload.then(s => {
        console.log(s); 
        this.setState({ imageUrl: id });
       }); 


       upload.on(firebase.storage.TaskEvent.STATE_CHANGED, e =>{
         console.log("running", e); 
       })

    }).catch(e =>  {
      console.log(e);  
    }); 



    // fetch("/api/saveimage", {
    //   method: "POST",
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(v),

    // }).then(res => {

    //   if (!res.ok) {
    //     throw Error(res.statusText);
    //   }

    //   return res.text()
    // }
    // )
    //   .then((text) => {

    //     console.log(text);
    //     this.setState({ imageUrl: text });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    //   ;
  }


  render() {
    return (
      <div className="index">

        <header>
          <h1>hyperactive.media</h1>

          <div>
            <button className="btn btn-share" onClick={() => {
              let core = this.state.canvasCore;
              core.requestJpeg();
              this.setState({ canvasCore: core });
            }}><span className="glyphicon glyphicon-share-alt" /> <span>  share your creation</span></button>
          </div>
        </header>

        <ShareOverlay
          visible={this.state.showShareDialog}
          currentJpeg={this.state.currentJpeg}
          imageUrl={this.state.imageUrl}
          onClose={() => {
            this.setState({
              showShareDialog: false,
              currentJpeg: false,
              imageUrl: false,
            });
          }} />

        <div className="main">

          <div className="canvas-container">
            <Canvas id="test-canvas"
              canvasCore={this.state.canvasCore}
              layers={[new CanvasLayer(this.state.algorithm.baseColor), new CanvasLayer(this.state.algorithm.baseColor)]}
              getJpeg={(v) => {
                this.handleGetJpeg(v);
              }}
            />
          </div>

          <div className="controls">
            <SimpleCarousel
              sourceObjects={this.algorithms}
              labelFn={(v) => { return v.name; }}
              name="algorithmsSelector"
              onChange={((v) => {
                let core = this.state.canvasCore;
                core.setDrawingSource(v);
                v.onChange();
                this.setState({ canvasCore: core });
                this.setState({ algorithm: v });
              })} />
            <AlgorithmControls 
              algorithm={this.state.algorithm} 
              changeTrigger={this.state.changeTrigger} />
          </div>
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
