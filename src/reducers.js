import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import _ from 'lodash';
import * as actions from './actions';

const channels = handleActions(
  {
    [actions.applyChannelSet]: (state, { payload }) => payload,
    [actions.pushChannel]: (state, { payload: { cid, byCID } }) => {
      const allCIDs = state.allCIDs.includes(cid) ? state.allCIDs : [...state.allCIDs, cid];
      return { ...state, allCIDs, byCID: { ...state.byCID, ...byCID } };
    },
    [actions.removeChannel]: (state, { payload: { cid } }) => {
      const allCIDs = state.allCIDs.filter(id => id !== cid);
      const byCID = _.pick(state.byCID, allCIDs);
      return { ...state, allCIDs, byCID };
    },
  },
  {},
);

const messages = handleActions(
  {
    [actions.applyChannelSet]: (state, { payload: { allCIDs } }) => allCIDs.reduce((acc, cid) => {
      const channelMessage = state[cid] || {};
      return { ...acc, [cid]: channelMessage };
    }, {}),
    // eslint-disable-next-line no-shadow
    [actions.updateMessages]: (state, { payload: { cid, messages } }) => {
      const stored = state[cid] || {};
      return { ...state, [cid]: { ...stored, ...messages } };
    },
    [actions.removeChannel]: (state, { payload: { cid } }) => {
      const check = (value, key) => Number(key) !== Number(cid);
      return _.pickBy(state, check);
    },
  },
  {},
);

const ui = handleActions(
  {
    [actions.selectChannel]: (state, { payload: { cid } }) => ({
      ...state,
      currentCID: cid,
    }),
    [actions.closeChannelDialog]: state => ({
      ...state,
      channelFormDialogState: { state: 'inactive', cid: null },
    }),
    [actions.openAddChannelDialog]: state => ({
      ...state,
      channelFormDialogState: { state: 'new', cid: null },
    }),
    [actions.openRenameChannelDialog]: (state, { payload: { cid } }) => ({
      ...state,
      channelFormDialogState: { state: 'rename', cid },
    }),
    [actions.openChannelDeleteDialog]: (state, { payload: { cid } }) => ({
      ...state,
      channelDeleteDialogState: { state: 'active', cid },
    }),
    [actions.closeChannelDeleteDialog]: state => ({
      ...state,
      channelDeleteDialogState: { state: 'inactive', cid: null },
    }),
  },
  {},
);

export default combineReducers({
  form,
  ui,
  data: combineReducers({ channels, messages }),
  username: handleActions({}, {}),
});
