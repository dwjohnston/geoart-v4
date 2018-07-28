import React from 'react';
import Slider from 'react-compound-slider'

import { Handle, Track } from "./slider/slider";

/**A basic component containing label, value display etc**/
 const ComponentSlider = ({param, changeEvent}) => {


    let handles = [1];
    let tracks = [1];

    return (<div className="slider-wrapper">

      <label>{param.label}</label>

      <Slider
        domain={[param.min, param.max]}
        step={param.step}
        className="slider"
        values={[param.value]}
        mode={2}
        vertical={true}
        reversed = {true}
        onChange={changeEvent}
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
                    domain={[param.value]}
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
          {param.value}
      </div>
    </div>



    );
  }

ComponentSlider.displayName = 'SliderWrapper';
ComponentSlider.propTypes = {};
ComponentSlider.defaultProps = {};

export default ComponentSlider; 
