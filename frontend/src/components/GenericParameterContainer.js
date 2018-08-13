import React, {
  Component,
  
} from 'react';

import PropTypes from 'prop-types';
import {Parameter, ColorParameter} from 'geoplanets-model';
//import LfoParam from "../model/LfoParam";
import {Color} from "blacksheep-geometry";

import ComponentSlider from "./ComponentSlider";
import ComponentColorPicker from "./ComponentColorPicker";
//import ComponentLfoParam from "./ComponentLfoParam";




/***
This here is a container intended to wrap any parameters (eg single dimension ranges (Parameter), Colors, booleans etc, and update the redux state with them)
*/
class GenericParameterContainer extends Component {


  constructor(props) {
    super(); 
    this.state = {
      param: props.param
    }; 
  }

  componentWillMount() {
  }

  componentDidRecieveProps() {
  }

  componentWillUpdate() {
  }

  changeParameter= (v) => {
    this.props.param.value = v;
    this.props.onChange(v);
  }

  changeLfoParam =(v) => {

    this.props.param.value = v.main.value;
    this.props.param.lfoAmount = v.lfoAmount.value;
    this.props.param.lfoFreq = v.lfoFreq.value;

    this.props.onChange(v);




  }

  changeColor = (v) => {

    this.props.param.r = v.r;
    this.props.param.g = v.g;
    this.props.param.b = v.b;
    this.props.param.opacity = v.a;
    this.props.param.a = v.a;

    this.props.onChange(v);

  }

  componentWillMount() {

  }

  render() {
    const { param } = this.props;

    switch(param.constructor) {

      case Parameter: return <ComponentSlider param = {param} changeEvent = {this.changeParameter}  />;
      case ColorParameter: return <ComponentColorPicker color = {param} changeEvent = { this.changeColor}/>;
      //case LfoParam : return <ComponentLfoParam param = {param} changeEvent={this.changeLfoParam}/>;


      default: return <div> empty</div>;

      }



    }
  }

  GenericParameterContainer.propTypes = {
    actions: PropTypes.shape({})
  };

export default GenericParameterContainer; 