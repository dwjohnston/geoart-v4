import React from 'react';

const PlanetPreview = ({planet})  => {


  const color = planet.color; 
    return (

      <div className = "planet-preview"> 

        <div/> 

        <div 
          className="planet-preview-outline" 
          style = {{"borderColor": color?  color.getValue().shift(50,0).toString() : 'rgba(0,0,0,0)'}} >
        </div>

        <div 
          className = "planet-preview-solid-square" 
          style = {{"backgroundColor": color? color.getValue().shift(0, 1).toString() : 'rgba(0,0,0,0)'}}
        /> 
      </div> 
    );
  }


PlanetPreview.displayName = 'PlanetPreview';

export default PlanetPreview;
