import React from 'react';


class PlanetPreview extends React.Component {

  render() {
    return (

      <div className = "planet-preview"> 

        <div/> 

        <div 
          className="planet-preview-outline" 
          style = {{"borderColor":  this.props.planet.color.shift(50,0).toString()}} >
        </div>

        <div 
          className = "planet-preview-solid-square" 
          style = {{"backgroundColor": this.props.planet.color.shift(0, 1).toString()}}
        /> 
      </div> 
    );
  }
}

PlanetPreview.displayName = 'PlanetPreview';

PlanetPreview.defaultProps = {};

export default PlanetPreview;
