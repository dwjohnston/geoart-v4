import React from 'react';
import Slider from 'react-compound-slider'

import { Handle, Track } from "./slider/slider";

/**A basic component containing label, value display etc**/



 class ComponentSlider extends React.Component {



    constructor(props) {
      super();
      this.state = {
        v: props.param.value
      }; 
    }

    onChange = (v) =>  {
      this.setState({v: v[0]}); 
      this.props.changeEvent(v[0]); 
    }

    render() {
    const {param} = this.props;
    let handles = [1];
    let tracks = [1];
    return (<div className="slider-wrapper">

      <label>{param.label}</label>

      <Slider
        domain={[param.min, param.max]}
        step={param.step}
        className="slider"
        values={[this.state.v]}
        mode={2}
        vertical={true}
        reversed = {true}
        onChange={this.onChange}
      >

        <Slider.Handles>
          {({ handles, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map(handle => {
                return (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={[this.state.v]}
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
  }}

ComponentSlider.displayName = 'SliderWrapper';
ComponentSlider.propTypes = {};
ComponentSlider.defaultProps = {};

export default ComponentSlider; 
