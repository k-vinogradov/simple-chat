import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from './actions';

const channels = handleActions({}, {});

const messages = handleActions(
  {
    [actions.receiveMessage]: (state, { payload }) => {
      const { cid } = payload;
      const stored = state[cid] || [];
      return { ...state, [cid]: [...stored, payload] };
    },
  },
  {},
);

const ui = handleActions(
  {
    [actions.channelSelected]: (state, { payload }) => ({ ...state, currentCID: payload }),
    [actions.postMessageRequest]: (state, { payload: { cid, body } }) => ({
      ...state,
      cache: { ...state.cache, [cid]: body },
      channelsState: { ...state.channelsState, [cid]: 'sending' },
    }),
    [actions.postMessageSuccess]: (state, { payload: { cid } }) => ({
      ...state,
      cache: { ...state.cache, [cid]: '' },
      channelsState: { ...state.channelsState, [cid]: 'synced' },
    }),
    [actions.postMessageFailure]: (state, { payload: { cid, body } }) => ({
      ...state,
      cache: { ...state.cache, [cid]: body },
      channelsState: { ...state.channelsState, [cid]: 'error' },
    }),
  },
  {},
);

export default combineReducers({
  form: formReducer,
  data: combineReducers({ channels, messages }),
  ui,
  username: handleActions({}, {}),
});
