import { handleActions } from 'redux-actions';
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
  },
  {},
);
