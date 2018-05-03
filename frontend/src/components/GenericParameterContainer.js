import React, {
  Component,
  PropTypes
} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  updateParam,
  test
} from '../actions/';

import Parameter from '../model/Parameter';
import LfoParam from "../model/LfoParam";
import {Color} from "blacksheep-react-canvas";

import ComponentSlider from "../components/ComponentSlider";
import ComponentColorPicker from "../components/ComponentColorPicker";
import ComponentLfoParam from "../components/ComponentLfoParam";




/***
This here is a container intended to wrap any parameters (eg single dimension ranges (Parameter), Colors, booleans etc, and update the redux state with them)
*/
class GenericParameterContainer extends Component {

  changeParameter(v) {
    this.props.param.value = v;
  //  this.props.param.hasChanged = true;


    this.props.onChange(v);
    //  this.props.actions.updateParam(this.props.param);
  }

  changeLfoParam(v) {


    this.props.param.value = v.main.value;
    this.props.param.lfoAmount = v.lfoAmount.value;
    this.props.param.lfoFreq = v.lfoFreq.value;

    //this.props.param.hasChanged = true;

    this.props.onChange(v);


    //Don't actually need to dispatch actions


  }

  changeColor(v) {


    this.props.param.r = v.r;
    this.props.param.g = v.g;
    this.props.param.b = v.b;
    this.props.param.opacity = v.opacity;

    //this.props.param.hasChanged = true;

    this.props.onChange(v);

    //this.props.actions.updateParam(v);
  }

  componentWillMount() {
    this.props.actions.updateParam(this.props.param);

  }

  render() {
    const { actions } = this.props;

    switch(this.props.param.constructor) {

      case Parameter: return <ComponentSlider param = {this.props.param} changeEvent = {(v) => this.changeParameter(v)}  />;
      case Color: return <ComponentColorPicker color = {this.props.param} changeEvent = {(v) => this.changeColor(v)}/>;
      case LfoParam : return <ComponentLfoParam param = {this.props.param} changeEvent={(v) => this.changeLfoParam(v)}/>;


      default: return <div> empty</div>;

      }



    }
  }

  GenericParameterContainer.propTypes = {
    actions: PropTypes.shape({})
  };

  function mapStateToProps(state, ownProps) {


    const props = {};
    return props;
  }

  function mapDispatchToProps(dispatch, ownProps) {


    const actions = {
      updateParam
    };


    const actionMap = { actions: bindActionCreators(actions, dispatch) };

    return actionMap;
  }

  export default connect(mapStateToProps, mapDispatchToProps)(GenericParameterContainer);
