import { handleActions } from 'redux-actions';
import * as actions from '../actions';

export default handleActions(
  {
    [actions.applyChannelSet]: (state, { payload }) => payload,
    [actions.receiveNewChannel]: (state, { payload: { cid, byCID } }) => ({
      ...state,
      allCIDs: [...state.allCIDs, cid],
      byCID: { ...state.byCID, ...byCID },
    }),
  },
  {},
);
