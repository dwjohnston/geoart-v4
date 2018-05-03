import React from 'react';
import RoundSlider from "blacksheep-react-round-slider";


/**A basic component containing label, value display etc**/
class ComponentSlider extends React.Component {


  componentDidUpdate() {



  }

  changeEvent(v) {
    this.setState({v:v});

    //this.props.param.hasChanged = true;

    if (this.props.changeEvent){
      this.props.changeEvent(v);
    }
  }


  componentWillMount() {
    this.setState({v: this.props.param.value});
  }

  render() {
    return (
      <RoundSlider

        min = {this.props.param.min}
        max = {this.props.param.max}
        label = {this.props.param.label}
        step = {this.props.param.step}
        value = {this.state.v}
        onChange = {(y) => {
          this.changeEvent(y);
        }}

        />



    );
  }
}

ComponentSlider.displayName = 'SliderWrapper';
ComponentSlider.propTypes = {};
ComponentSlider.defaultProps = {};

export default ComponentSlider; 
