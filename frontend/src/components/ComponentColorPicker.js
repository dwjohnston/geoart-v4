import React from 'react';
import ComponentSlider from "./ComponentSlider";
import Parameter from "../model/Parameter";

import {Color} from 'blacksheep-react-canvas';
import {RgbaPicker} from "react-rgba-color-picker";
class ComponentColorPicker extends React.Component {

  handleChange  = (color) => {
      this.props.changeEvent(color);
  }


  componentDidUpdate() {

  }

  componentWillMount() {

  }

  render() {
    return (
        <RgbaPicker color={this.props.color} onChange={this.handleChange} />
        );
      }
    }

    ComponentColorPicker.displayName = 'ColorParam';
    ComponentColorPicker.propTypes = {};
    ComponentColorPicker.defaultProps = {};

    export default ComponentColorPicker;
