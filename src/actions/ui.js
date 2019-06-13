import { createAction } from 'redux-actions';

export const openAddChannelDialog = createAction('OPEN_ADD_CHANNEL_DIALOG');
export const openRenameChannelDialog = createAction('OPEN_RENAME_CHANNEL_DIALOG');
export const closeChannelDialog = createAction('CLOSE_CHANNEL_DIALOG');
export const selectChannel = createAction('SELECT_CHANNEL');
