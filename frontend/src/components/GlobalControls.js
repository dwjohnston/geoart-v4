import React from 'react';




const GlobalControls = ({algorithm, forceChange}) => {

    const randomize = () => {
        algorithm.randomize(); 
        forceChange();
    }

    return ( 
        <div className ="global-controls"> 
            <button onClick = {randomize}> <i className="fas fa-random"></i> </button> 
        </div> 
    );
}; 

export default GlobalControls; 