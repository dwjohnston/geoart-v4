import React from 'react';




const GlobalControls = ({algorithm}) => {

    const randomize = () => {
        algorithm.randomize(); 
    }

    return ( 
        <div className ="global-controls"> 
            <button onClick = {randomize}> <i className="fas fa-random"></i> </button> 
        </div> 
    );
}; 

export default GlobalControls; 