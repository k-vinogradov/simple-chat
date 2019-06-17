import { handleActions } from 'redux-actions';
import _ from 'lodash';
import * as actions from '../actions';

export default handleActions(
  {
    [actions.applyChannelSet]: (state, { payload }) => payload,
    [actions.pushChannelToState]: (state, { payload: { cid, byCID } }) => {
      const allCIDs = state.allCIDs.includes(cid) ? state.allCIDs : [...state.allCIDs, cid];
      return { ...state, allCIDs, byCID: { ...state.byCID, ...byCID } };
    },
    [actions.removeChannelFromState]: (state, { payload: { cid } }) => {
      const allCIDs = state.allCIDs.filter(id => id !== cid);
      const byCID = _.pick(state.byCID, allCIDs);
      return { ...state, allCIDs, byCID };
    },
  },
  {},
);
