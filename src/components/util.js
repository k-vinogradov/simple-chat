import { connect as reduxConnect } from 'react-redux';
import { reduxForm as rf } from 'redux-form';
import * as actionCreators from '../actions';

export const connect = mapStateToProps => component => reduxConnect(
  mapStateToProps,
  actionCreators,
)(component);

export const reduxForm = form => component => rf({ form })(component);
