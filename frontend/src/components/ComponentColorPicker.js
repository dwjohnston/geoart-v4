import React from 'react';
import './styles/colorparam.scss';
import ComponentSlider from "./ComponentSlider";
import Parameter from "../model/Parameter";

import {Color} from 'blacksheep-react-canvas';

import {HuePicker, AlphaPicker} from 'react-color';

class ComponentColorPicker extends React.Component {

  handleChange(color, e){
    //
    console.log(color);
    console.log(e);
    let newColor = new Color (color.rgb.r, color.rgb.g, color.rgb.b, color.rgb.a);
    newColor.id = "color";
    this.setState({color:newColor});

    if (this.props.changeEvent){
      this.props.changeEvent(newColor);
    }
  }


  componentDidUpdate() {

  }

  componentWillMount() {

    this.setState({
      color: this.props.color
    });
  }

  render() {
    return (
      <div className="colorparam-component" >

        <HuePicker
          color = {this.state.color}
          onChangeComplete = {this.handleChange.bind(this)}
          direction = "vertical"
          width = "60px"
          height = "130px"
          />

          <AlphaPicker
            color = {this.state.color}
            onChangeComplete = {this.handleChange.bind(this)}
            direction = "vertical"
            width = "60px"
            height = "130px"
            />


          </div>
        );
      }
    }

    ComponentColorPicker.displayName = 'ColorParam';
    ComponentColorPicker.propTypes = {};
    ComponentColorPicker.defaultProps = {};

    export default ComponentColorPicker;
