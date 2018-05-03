import React, {
  Component,
  
} from 'react';

import PropTypes from 'prop-types';
import Parameter from '../model/Parameter';
import LfoParam from "../model/LfoParam";
import {Color} from "blacksheep-react-canvas";

import ComponentSlider from "./ComponentSlider";
import ComponentColorPicker from "./ComponentColorPicker";
import ComponentLfoParam from "./ComponentLfoParam";




/***
This here is a container intended to wrap any parameters (eg single dimension ranges (Parameter), Colors, booleans etc, and update the redux state with them)
*/
class GenericParameterContainer extends Component {

  changeParameter(v) {
    this.props.param.value = v;
    this.props.onChange(v);
  }

  changeLfoParam(v) {

    this.props.param.value = v.main.value;
    this.props.param.lfoAmount = v.lfoAmount.value;
    this.props.param.lfoFreq = v.lfoFreq.value;

    this.props.onChange(v);




  }

  changeColor(v) {


    this.props.param.r = v.r;
    this.props.param.g = v.g;
    this.props.param.b = v.b;
    this.props.param.opacity = v.opacity;

    this.props.onChange(v);

  }

  componentWillMount() {

  }

  render() {
    const { param } = this.props;

    switch(param.constructor) {

      case Parameter: return <ComponentSlider param = {param} changeEvent = {(v) => this.changeParameter(v)}  />;
      case Color: return <ComponentColorPicker color = {param} changeEvent = {(v) => this.changeColor(v)}/>;
      case LfoParam : return <ComponentLfoParam param = {param} changeEvent={(v) => this.changeLfoParam(v)}/>;


      default: return <div> empty</div>;

      }



    }
  }

  GenericParameterContainer.propTypes = {
    actions: PropTypes.shape({})
  };

export default GenericParameterContainer; 