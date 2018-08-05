import React from 'react';
import GenericParameterContainer from "./GenericParameterContainer";

import Planet from '../model/algoComponents/Planet';
import LfoPlanet from '../model/algoComponents/LfoPlanet';
import GeoPlanet from '../model/algoComponents/GeoPlanet';
import FunkyGeoPlanet from '../model/algoComponents/FunkyGeoPlanet';
import GoldenRectangleSpiral from '../model/algoComponents/GoldenRectangleSpiral';

import ComponentColorPicker from "./ComponentColorPicker";

import Parameter from '../model/Parameter';

import ParameterContainer from '../model/ParameterContainer';

import LfoParam from '../model/LfoParam';

import { Color } from 'blacksheep-react-canvas';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
//import Slider from "blacksheep-react-round-slider";
import Slider from "./slider/slider";
import PlanetPreview from './PlanetPreview';
import 'react-tabs/style/react-tabs.css';


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


  renderPlanet(planet, id) {

    let container = [];

    id = [id, "planet", planet.label].join("-");
    for (let planetParam of planet.getParams()) {
      container.push(this.genericRender(planetParam, id));
    }


    return <div className="controls-container" key = {id}>{container}</div>
  }

  renderParameter(param, id) {

    param.id = [id, "param", param.label].join("-");

    return <GenericParameterContainer param={param} key={param.id}
      onChange={(v) => {
        this.props.onChange(param, v); 
      }}
    />
  }

  renderColor(color, id) {
    color.id = [id, "color"].join("-");

    return <GenericParameterContainer param={color} key={color.id}
      onChange={(v) => {
        this.props.onChange(color,v); 
        this.setState({
           tabs: this.renderTabs(this.state.algorithm)
        });
      }} />;
  }

  renderLfoParam(param, id) {

    param.id = [id, "lfoparam"].join("-");

    return <GenericParameterContainer 
      param={param} 
      key={param.id} 
      onChange={(v) => {
        this.props.onChange(param, v); 
      }}
     />;

  }

  renderParameterContainer(param, id) {

    let container = [];

    id = [id, "paramcontainer", param.label].join("-");
    for (let childParam of param.params) {
      container.push(this.genericRender(childParam, id));
    }


    return <div className="controls-container" key={id}>{container} </div>

  }

  renderError(param, id) {
    return <div> render error: {id} {param.label}</div>
  }

  genericRender(param, id) {

    switch (param.constructor) {
      case Planet: return this.renderPlanet(param, id);
      case LfoPlanet: return this.renderPlanet(param, id);
      case GeoPlanet: return this.renderPlanet(param, id);
      case FunkyGeoPlanet: return this.renderPlanet(param, id);
      case GoldenRectangleSpiral: return this.renderPlanet(param, id);

      case Parameter: return this.renderParameter(param, id);
      case Color: return this.renderColor(param, id);
      case LfoParam: return this.renderLfoParam(param, id);
      case ParameterContainer: return this.renderParameterContainer(param, id);

      default: return this.renderError(param, id);
    }
  }

  renderTabs(algorithm) {
    let tabs = [];
    let algoParams = algorithm.getParams();
    let i = 0;

    function renderPreview(param, key) {

      switch (param.constructor) {
        case Planet: return <PlanetPreview planet={param} key ={key} />;
        case GeoPlanet: return <PlanetPreview planet={param} key ={key}/>;
        case FunkyGeoPlanet: return <PlanetPreview planet={param} key ={key}/>;
        case ParameterContainer:  <i className={param.tabClassName || "fas fa-question"} key ={key}/>; 
        default: return <i className={param.tabClassName || "fas fa-question"} key ={key}/>;
      }
    }


    for (let param of algoParams) {

      let key = [algorithm.name, param.label, "tab", i++].join("-");

      tabs.push(<Tab className={"react-tabs__tab "} key={key}>
        {renderPreview(param, key)}
      </Tab>);
    }
    return tabs;

  }

  renderTabPanels(algorithm) {
    let panels = [];
    let algoParams = algorithm.getParams();
    let i = 0;

    for (let param of algoParams) {
      let key = [algorithm.name, param.label, "tab-panel", i++].join("-");
      panels.push(<TabPanel key={key}>{this.genericRender(param)}</TabPanel>);
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
