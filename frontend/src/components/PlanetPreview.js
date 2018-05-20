import React from 'react';


class PlanetPreview extends React.Component {

  render() {
    return (
      <div 
        className="planet-preview" 
        style = {{"borderColor":  this.props.planet.color.shift(50,0).toString()}} >
      </div>
    );
  }
}

PlanetPreview.displayName = 'PlanetPreview';

PlanetPreview.defaultProps = {};

export default PlanetPreview;
