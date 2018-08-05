import React from 'react';
import ComponentSlider from "./ComponentSlider";
import Parameter from "../model/Parameter";

import {Color} from 'blacksheep-react-canvas';
import {RgbaPicker} from "react-rgba-color-picker";
class ComponentColorPicker extends React.Component {


  constructor(props) {
    super(); 
    this.state = {
      color: props.color
    }
  }

  handleChange  = (color) => {
      this.setState({color: color});      
      this.props.changeEvent(color);

  }


  componentDidUpdate() {

  }

  componentWillMount() {

  }

  render() {
    return (
        <RgbaPicker color={this.state.color} onChange={this.handleChange} />
        );
      }
    }

    ComponentColorPicker.displayName = 'ColorParam';
    ComponentColorPicker.propTypes = {};
    ComponentColorPicker.defaultProps = {};

    export default ComponentColorPicker;
