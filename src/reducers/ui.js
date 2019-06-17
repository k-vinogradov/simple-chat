import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const ui = handleActions(
  {
    [actions.postMessageRequest]: state => ({ ...state, globalUiState: 'normalLocked' }),
    [actions.postMessageSuccess]: state => ({
      ...state,
      messageFormState: 'ok',
      globalUiState: 'normal',
    }),
    [actions.postMessageFailure]: state => ({
      ...state,
      messageFormState: 'error',
      globalUiState: 'normal',
    }),

    [actions.selectChannel]: (state, { payload: { cid } }) => ({
      ...state,
      currentCID: cid,
      messageFormState: 'ok',
      globalUiState: 'normal',
    }),

    [actions.closeChannelDialog]: state => ({ ...state, globalUiState: 'normal' }),
    [actions.openAddChannelDialog]: state => ({
      ...state,
      globalUiState: 'channelFormDialog',
      channelFormDialogState: { state: 'new', cid: null },
    }),
    [actions.addChannelRequest]: state => ({ ...state, globalUiState: 'channelFormDialogLocked' }),
    [actions.addChannelSuccess]: state => ({ ...state, globalUiState: 'normal' }),
    [actions.addChannelFailure]: state => ({
      ...state,
      globalUiState: 'channelFormDialog',
      channelFormDialogState: { state: 'errorNew', cid: null },
    }),

    [actions.openRenameChannelDialog]: (state, { payload: { cid } }) => ({
      ...state,
      globalUiState: 'channelFormDialog',
      channelFormDialogState: { state: 'rename', cid },
    }),
    [actions.renameChannelRequest]: state => ({
      ...state,
      globalUiState: 'channelFormDialogLocked',
    }),
    [actions.renameChannelSuccess]: state => ({ ...state, globalUiState: 'normal' }),
    [actions.renameChannelFailure]: state => ({
      ...state,
      globalUiState: 'channelFormDialog',
      channelFormDialogState: { ...state.channelFormDialogState, state: 'errorRename' },
    }),

    [actions.openChannelDeleteDialog]: (state, { payload: { cid } }) => ({
      ...state,
      globalUiState: 'channelDeleteDialog',
      channelDeleteDialogState: { state: 'ok', cid },
    }),
    [actions.deleteChannelRequest]: state => ({
      ...state,
      globalUiState: 'channelDeleteDialogLocked',
    }),
    [actions.deleteChannelFailure]: state => ({
      ...state,
      globalUiState: 'channelDeleteDialog',
      channelDeleteDialogState: { ...state.channelDeleteDialogState, state: 'error' },
    }),
    [actions.closeChannelDeleteDialog]: state => ({ ...state, globalUiState: 'normal' }),
    [actions.deleteChannelSuccess]: state => ({ ...state, globalUiState: 'normal' }),
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
      [actions.selectChannel]: state => setFormText(state, ''),
      [actions.postMessageSuccess]: state => setFormText(state, ''),
    },
    {},
  ),
  channelForm: handleActions(
    {
      [actions.openAddChannelDialog]: state => setFormText(state, ''),
      [actions.openRenameChannelDialog]: (state, { payload: { name } }) => setFormText(state, name),
    },
    {},
  ),
});

export { ui, form };
