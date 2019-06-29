import { createAction } from 'redux-actions';

// Data Actions

export const applyChannelSet = createAction('APPLY_CHANNEL_SET');
export const pushChannel = createAction('PUSH_CHANNEL_TO_STATE');
export const removeChannel = createAction('REMOVE_CHANNEL_FROM_STATE');

export const updateMessages = createAction('UPDATE_MESSAGES');

// UI Actions

export const selectChannel = createAction('SELECT_CHANNEL');

export const openAddChannelDialog = createAction('OPEN_ADD_CHANNEL_DIALOG');
export const openRenameChannelDialog = createAction('OPEN_RENAME_CHANNEL_DIALOG');
export const closeChannelDialog = createAction('CLOSE_CHANNEL_DIALOG');

export const openChannelDeleteDialog = createAction('OPEN_CHANNEL_DELETE_DIALOG');
export const closeChannelDeleteDialog = createAction('CLOSE_CHANNEL_DELETE_DIALOG');
