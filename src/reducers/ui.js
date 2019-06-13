import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const setChannelDialog = (fullState, state, cid = null) => ({
  ...fullState,
  channelDialogState: { state, cid },
});

const setChannel = (fullState, state, cid, messageCache) => ({
  ...fullState,
  [cid]: { state, messageCache },
});

const ui = handleActions(
  {
    [actions.postMessageRequest]: (state, { payload: { cid, body } }) => setChannel(state, cid, 'sending', body),
    [actions.postMessageSuccess]: (state, { payload: { cid } }) => setChannel(state, cid, 'ok', ''),
    [actions.postMessageFailure]: (state, { payload: { cid, body } }) => setChannel(state, cid, 'error', body),

    [actions.selectChannel]: (state, { payload: { cid } }) => ({ ...state, currentCID: cid }),

    [actions.closeChannelDialog]: state => setChannelDialog(state, 'inactive'),

    [actions.openAddChannelDialog]: state => setChannelDialog(state, 'new'),
    [actions.addChannelRequest]: state => setChannelDialog(state, 'sending'),
    [actions.addChannelSuccess]: state => setChannelDialog(state, 'inactive'),
    [actions.addChannelFailure]: state => setChannelDialog(state, 'errorNew'),
    [actions.receiveNewChannel]: (state, { payload: { cid } }) => ({
      ...state,
      channels: { ...state.channels, [cid]: { state: 'ok', messageCache: '' } },
    }),

    [actions.openRenameChannelDialog]: (state, { payload: { cid } }) => setChannelDialog(state, 'rename', cid),
    [actions.renameChannelRequest]: (state, { payload: { cid } }) => setChannelDialog(state, 'sending', cid),
    [actions.renameChannelSuccess]: state => setChannelDialog(state, 'inactive'),
    [actions.renameChannelFailure]: (state, { payload: { cid } }) => setChannelDialog(state, 'errorRename', cid),
  },
  {},
);

const setFormText = (state, text) => ({
  ...state,
  values: { ...state.values, text },
});

const form = formReducer.plugin({
  newMessage: handleActions(
    {
      [actions.selectChannel]: (
        state,
        {
          payload: {
            state: { messageCache },
          },
        },
      ) => setFormText(state, messageCache),
      [actions.postMessageSuccess]: state => setFormText(state, ''),
    },
    {},
  ),
  channelForm: handleActions(
    {
      [actions.closeChannelDialog]: state => setFormText(state, ''),
      [actions.addChannelSuccess]: state => setFormText(state, ''),
      [actions.openRenameChannelDialog]: (state, { payload: { name } }) => setFormText(state, name),
      [actions.renameChannelSuccess]: state => setFormText(state, ''),
    },
    {},
  ),
});

export { ui, form };
