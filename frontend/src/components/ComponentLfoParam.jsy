import React from 'react';
import ComponentSlider from "./ComponentSlider";
import Parameter from "../model/Parameter";

class ComponentLfoParam extends React.Component {


  change(v, id) {
    let param = this.state[id];
    param.value = v;

    this.setState({id: param});



    if (this.props.changeEvent){
      this.props.changeEvent(this.state);
    }

  }

  componentDidUpdate() {

  }

  componentWillMount() {



    let param = this.props.param;

    //Magic numbers
    let lfoAmountStep = 0.01;


    this.setState({
      main: new Parameter(param.min, param.max, param.step, param.value, param.label),
      lfoAmount:  new Parameter(0, param.lfoRange, lfoAmountStep, param.lfoAmount, "LFO Amount"),
      lfoFreq:  new Parameter(param.lfoMinFreq, param.lfoMaxFreq, lfoAmountStep, param.lfoFreq, "LFO Freq"),
    });
  }

  render() {
    return (
      <div className="lfoparam-component" >

        <div className ="slider-container">
          <ComponentSlider param = {this.state.main} changeEvent ={(v) => this.change(v, "main")} />
          <ComponentSlider param = {this.state.lfoAmount} changeEvent ={(v) => this.change(v, "lfoAmount")}/>
          <ComponentSlider param = {this.state.lfoFreq} changeEvent ={(v) => this.change(v, "lfoFreq")}/>
        </div>

      </div>
    );
  }
}

ComponentLfoParam.displayName = 'LfoParam';
ComponentLfoParam.propTypes = {};
ComponentLfoParam.defaultProps = {};

export default ComponentLfoParam;
