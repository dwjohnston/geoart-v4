import React, {
  Component,
  PropTypes
} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {} from '../actions/';
import Main from '../components/App';
import {Canvas}  from 'blacksheep-react-canvas';


function mapStateToProps(state) {
  const props = {};
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {};
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

const CanvasContainer = connect(mapStateToProps, mapDispatchToProps)(Canvas);

export default CanvasContainer;
