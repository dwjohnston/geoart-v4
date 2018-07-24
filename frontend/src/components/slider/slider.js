// @flow weak

import React from "react";
import PropTypes from "prop-types";
import Slider from 'react-compound-slider'


// *******************************************************
// HANDLE COMPONENT
// *******************************************************
export function Handle({
  domain: [min, max],
  handle: { id, value, percent },
  getHandleProps
}) {
  return (
    <div
    className ="slider-handle"
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      style={{
        top: `calc(${percent}% - 1.5em)`,
      }}
      {...getHandleProps(id)}
    />
  );
}

Handle.propTypes = {
  domain: PropTypes.array.isRequired,
  handle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired
  }).isRequired,
  getHandleProps: PropTypes.func.isRequired
};

// *******************************************************
// TRACK COMPONENT
// *******************************************************
export function Track({ source, target, getTrackProps, id}) {
    return (
    <div
    className ="slider-track"
      style={{
        top: `${source.percent}%`,
        height: `${target.percent - source.percent}%`,
        backgroundColor: id === 0 ? 'rgba(10,10,10,1)' :  `rgba(200, 200, 200, ${ ((target.percent - source.percent)/100)})`
      }}
      {...getTrackProps()}
    />
  );
}

Track.propTypes = {
  source: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired
  }).isRequired,
  target: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired
  }).isRequired,
  getTrackProps: PropTypes.func.isRequired
};




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
  