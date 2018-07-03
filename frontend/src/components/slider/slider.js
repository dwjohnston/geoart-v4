// @flow weak

import React from "react";
import PropTypes from "prop-types";

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

