import React from 'react';
import GenericParameterContainer from "../containers/GenericParameterContainer";

import Planet from '../model/algoComponents/Planet';
import LfoPlanet from '../model/algoComponents/LfoPlanet';
import GeoPlanet from '../model/algoComponents/GeoPlanet';
import FunkyGeoPlanet from '../model/algoComponents/FunkyGeoPlanet';
import GoldenRectangleSpiral from '../model/algoComponents/GoldenRectangleSpiral';

import ComponentColorPicker from "./ComponentColorPicker";

import Parameter from '../model/Parameter';

import ParameterContainer from '../model/ParameterContainer';

import LfoParam from '../model/LfoParam';

import {Color} from 'blacksheep-react-canvas';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import Slider from "blacksheep-react-round-slider";
import PlanetPreview from './PlanetPreview';
import 'react-tabs/style/react-tabs.css';
import "./styles/tabs.scss";


class AlgorithmControls extends React.Component {


  renderPlanet(planet,id) {

    let container = [];

    id = [id, "planet", planet.label].join("-");
    for (let planetParam of planet.getParams()) {
      container.push(this.genericRender(planetParam, id ));
    }


    return <div className ="controls-container">{container}</div>
  }

  renderParameter(param,id) {

    param.id = [id, "param", param.label].join("-");

    return <GenericParameterContainer param={param} key={  param.id }
      onChange = {(v) => {

       console.log("param change");
       param.hasChanged = true;
     }}
      />
  }

  renderColor(color,id) {

    color.id =    [id, "color"].join("-");


    return <GenericParameterContainer param = {color} key = {color.id}

      onChange = {(v) => {

       console.log("color change");
       color.hasChanged = true;
     }} />;
  }

  renderLfoParam(param, id){

    param.id = [id, "lfoparam"].join("-");

    return <GenericParameterContainer param = {param} key = {param.id} onChange = {(v) => {

      console.log("lfo change");
      param.hasChanged = true;
    }}/>

  }

  renderParameterContainer(param, id) {

    let container = [];

    id = [id, "paramcontainer", param.label].join("-");
    for (let childParam of param.params) {
      container.push(this.genericRender(childParam, id ));
    }


    return <div className ="controls-container" key = {id}>{container} </div>

  }

  renderError(param, id) {
    return <div> render error: {id} {param.label}</div>
  }

  genericRender(param,id) {

    switch(param.constructor) {
      case Planet:              return this.renderPlanet(param,id);
      case LfoPlanet:           return this.renderPlanet(param, id);
      case GeoPlanet:           return this.renderPlanet(param, id);
      case FunkyGeoPlanet:      return this.renderPlanet(param, id);
      case GoldenRectangleSpiral: return this.renderPlanet(param, id);

      case Parameter:           return this.renderParameter(param,id);
      case Color:               return this.renderColor(param,id);
      case LfoParam:            return this.renderLfoParam(param,id);
      case ParameterContainer:  return this.renderParameterContainer(param, id);

      default:                  return this.renderError(param, id);
    }
  }

  //**MARKED FOR DELETION**/
  regenParams() {

    let params = [];
    let algoParams = this.props.algorithm.params;


    console.log('regenParams');
    let i = 0;
    for (let key in algoParams) {

      if (algoParams.hasOwnProperty(key)) {

        let param = algoParams[key];

        params.push(this.genericRender(param, [this.props.algorithm.name, i++].join("-") ));


      }

    }

    this.setState({params: params});
  }


  componentWillMount() {
    //this.renderTabs();
    //this.renderTabPanels();

    this.setState({value: 0.6});
  }

  componentDidUpdate() {

  }


  renderTabs() {
    let tabs = [];
    let algoParams = this.props.algorithm.getParams();

    let i = 0;


    console.log(this.props.algorithm);
    for (let param of algoParams) {

      console.log(param);
      let key = [this.props.algorithm.name, param.label, "tab", i++].join("-");

      tabs.push(<Tab className = {"react-tabs__tab " + param.className} key = {key}>
        {param.constructor === Planet &&
          <PlanetPreview planet = {param}/>
        }
      </Tab>);
    }
    return tabs;

  }

  renderTabPanels() {
    let panels = [];
    let algoParams = this.props.algorithm.getParams();

    let i = 0;
    for (let param of algoParams) {

      let key = [this.props.algorithm.name, param.label, "tab-panel", i++].join("-");

      panels.push(<TabPanel key = {key}>{this.genericRender(param)}</TabPanel>);
    }


    return panels;
  }

  render() {

    return (
      <div className="algorithmcontrols-component">

        <Tabs>
          <TabList>

            {this.renderTabs()}


          </TabList>

          {this.renderTabPanels()}


        </Tabs>
      </div>
    );
  }
}

AlgorithmControls.displayName = 'AlgorithmControls';
AlgorithmControls.propTypes = {};
AlgorithmControls.defaultProps = {};

export default AlgorithmControls;
