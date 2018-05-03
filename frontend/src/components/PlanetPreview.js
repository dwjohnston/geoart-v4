import React from 'react';


class PlanetPreview extends React.Component {

  constructor() {
    super();
  }


  componentWillMount() {


    this.setState( {
      color: this.props.planet.color
    });


  }

  render() {

      console.log(this.state.color); 

    return (
      <div className="planet-preview" style = {{border: 'solid 2px ' + this.state.color.shift(50,0.5).toString()}} >
      </div>
    );
  }
}

PlanetPreview.displayName = 'PlanetPreview';

PlanetPreview.defaultProps = {};

export default PlanetPreview;
