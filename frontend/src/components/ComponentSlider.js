import React from 'react';
import Slider from 'react-compound-slider'

import { Handle, Track } from "./slider/slider";

/**A basic component containing label, value display etc**/
class ComponentSlider extends React.Component {


  componentDidUpdate() {



  }

  changeEvent = (v)  => {


    this.setState({v: v});
    console.log(v);
    if (this.props.changeEvent) {
      this.props.changeEvent(v);
    }
  }


  componentWillMount() {
    this.setState({ v: this.props.param.value, 
    initValue: this.props.param.value});
  }

  render() {

    let handles = [1];
    let tracks = [1];

    return (<div className="slider-wrapper">

      <label>{this.props.param.label}</label>

      <Slider
        domain={[this.props.param.min, this.props.param.max]}
        step={this.props.param.step}
        className="slider"
        values={[this.state.initValue]}
        mode={2}
        vertical={true}
        reversed = {true}
        onChange={this.changeEvent}
      >

        <Slider.Handles>
          {({ handles, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map(handle => {
                console.log(handle);
                return (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={[this.state.initValue]}
                    getHandleProps={getHandleProps}
                  />
                )
              })}
            </div>)}
        </Slider.Handles>

        <Slider.Tracks left={true} right={true}>
          {({ tracks, getTrackProps }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }, i) => (
                <Track
                  key={id}
                  id={i}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                />
              ))}
            </div>
          )}
        </Slider.Tracks>

        <Slider.Rail>
          {({ getRailProps }) => (
            <div className="slider-rail" {...getRailProps()} />
          )}
        </Slider.Rail>


      </Slider>
      <div className="value">
          {this.state.v}
      </div>
    </div>



    );
  }
}

ComponentSlider.displayName = 'SliderWrapper';
ComponentSlider.propTypes = {};
ComponentSlider.defaultProps = {};

export default ComponentSlider; 
