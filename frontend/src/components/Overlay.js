import React from 'react';


class Overlay extends React.Component  {

    constructor() {
        super(); 

        this.state =  {
            open: false
        };

        this.ref = React.createRef(); 
    }
    
    handleClick = () => {
        this.setState({
            open: !this.state.open
        }); 
    }

    render() {

        const {onClose, children, customButtonContent} = this.props; 

    return (



        <div className = "overlay-container"> 

            <button className = {`btn overlay-trigger ${this.state.open? 'open' : ''}`} 
                onClick = {this.handleClick}>{customButtonContent? customButtonContent : 'open'}

                 </button> 

            <div className = {`overlay-dialog ${this.state.open? 'open' : ''}`} > 
                <button ref = {this.ref} className = "btn btn-large btn-close" onClick = {this.handleClick}
                > 
                          <i className="fas fa-times"></i>

                </button> 

                <div className ="overlay-content">  {children}</div> 
            </div> 

        </div> 
    ); 

}
}


export default Overlay; 