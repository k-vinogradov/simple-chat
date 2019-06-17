import { handleActions } from 'redux-actions';
import _ from 'lodash';
import * as actions from '../actions';

export default handleActions(
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
    [actions.removeChannelFromState]: (state, { payload: { cid } }) => {
      const check = (value, key) => Number(key) !== Number(cid);
      return _.pickBy(state, check);
    },
  },
  {},
);
