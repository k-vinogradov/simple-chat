import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import channels from './channels';
import messages from './messages';
import { ui, form } from './ui';

export default combineReducers({
  form,
  ui,
  data: combineReducers({ channels, messages }),
  username: handleActions({}, {}),
});
