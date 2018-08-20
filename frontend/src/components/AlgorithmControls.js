import React from 'react';

// import Planet from '../model/algoComponents/Planet';
// import LfoPlanet from '../model/algoComponents/LfoPlanet';
// import GeoPlanet from '../model/algoComponents/GeoPlanet';
// import FunkyGeoPlanet from '../model/algoComponents/FunkyGeoPlanet';
//import GoldenRectangleSpiral from '../model/algoComponents/GoldenRectangleSpiral';

import ComponentColorPicker from "./ComponentColorPicker";
import ComponentSlider from "./ComponentSlider"; 

import {SimpleParameter, ColorParameter, PlanetParameter} from 'geoplanets-model';

//import ParameterContainer from '../model/ParameterContainer';

//import LfoParam from '../model/LfoParam';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
//import Slider from "blacksheep-react-round-slider";
import PlanetPreview from './PlanetPreview';
import 'react-tabs/style/react-tabs.css';
import { fullClone } from 'davids-toolbox';


class AlgorithmControls extends React.Component {


  constructor(props) {
    super(); 


    console.log(props);
    this.state = {
      algorithm:  props.algorithm, 
      tabs:   this.renderTabs(props.algorithm),
      panels: this.renderTabPanels(props.algorithm)
    };

    
  }

  componentDidMount() {
  }

  componentWillReceiveProps(props) {

    console.log(props);
    this.setState({
      algorithm:props.algorithm, 
      tabs: this.renderTabs(props.algorithm), 
      panels: this.renderTabPanels(props.algorithm)
    });
  }

  renderParameter(param, id) {

    param.id = [id, "param", param.label].join("-");

    return <ComponentSlider param={param} key={param.id}
      changeEvent={(v) => {
        param.updateValue(v); 
        this.props.onChange(param, v); 
      }}
    />
  }

  renderColor(color, id) {
    color.id = [id, "color"].join("-");

    return <ComponentColorPicker color = {color.getValue()}  key={color.id}
    changeEvent ={(v) => {
  
      let newColor =     Object.assign(fullClone(color.getValue()), v); 
      color.updateValue(newColor);
      
        this.setState({
           tabs: this.renderTabs(this.state.algorithm)
        });
      }} />;
  }

  renderError(param, id) {
    return <div> render error: {id} {param.label}</div>
  }

  genericRender(group, id) {

    return group.params.map(param => {

      console.log(param);
      switch (param.constructor) {
        //case PlanetParameter: return this.renderPlanet(param, id);
       // case LfoPlanet: return this.renderPlanet(param, id);
       // case GeoPlanet: return this.renderPlanet(param, id);
       // case FunkyGeoPlanet: return this.renderPlanet(param, id);
       // case GoldenRectangleSpiral: return this.renderPlanet(param, id);
  
        case SimpleParameter: return this.renderParameter(param, id);
        case ColorParameter: return this.renderColor(param, id);
       // case LfoParam: return this.renderLfoParam(param, id);
       // case ParameterContainer: return this.renderParameterContainer(param, id);
  
        default: return this.renderError(param, id);
      }

    })

  }

  renderTabs(algorithm) {
    let tabs = [];
    let algoParams = algorithm.getRenderHint();
    let i = 0;
    console.log(algoParams); 
    function renderPreview(param, rkey) {

      switch (param.type) {
        case "planet": return <PlanetPreview color={param.color} key ={rkey} />;
        //case GeoPlanet: return <PlanetPreview planet={param} key ={key}/>;
        //case FunkyGeoPlanet: return <PlanetPreview planet={param} key ={key}/>;
        //case ParameterContainer:  <i className={param.tabClassName || "fas fa-question"} key ={key}/>; 
        default: return <i className={"fas fa-" + param.icon || "fas fa-question"} key ={rkey}/>;
      }
    }



    for (let [key, value] of Object.entries(algoParams)) {
      console.log(key, value); 
      let rkey = [algorithm.name, value.label, "tab", i++].join("-");
      tabs.push(<Tab className={"react-tabs__tab "} key={rkey}>
        {renderPreview(value, rkey)}
      </Tab>);
    }

    return tabs;

  }

  renderTabPanels(algorithm) {
    let panels = [];
    let algoParams = algorithm.getRenderHint();
    let i = 0;

    for (let [key, group] of Object.entries(algorithm.getRenderHint())) {
      let rkey = [algorithm.name, "tab-panel", i++].join("-");
      panels.push(<TabPanel key={rkey}>{this.genericRender(group, key)}</TabPanel>);
    }

    return panels;
  }

  render() {

    return (
      <div className="algorithmcontrols-component">
        <Tabs>
          <TabList>
            {this.state.tabs}
          </TabList>
          {this.state.panels}
        </Tabs>
      </div>
    );
  }
}

AlgorithmControls.displayName = 'AlgorithmControls';
AlgorithmControls.propTypes = {};
AlgorithmControls.defaultProps = {};

export default AlgorithmControls;
