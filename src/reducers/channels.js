import { handleActions } from 'redux-actions';
import { selectChannel } from '../actions';

const channels = handleActions(
  {
    [selectChannel]: (state, { payload: { cid } }) => ({ ...state, activeCID: cid }),
  },
  {},
);

export default channels;
