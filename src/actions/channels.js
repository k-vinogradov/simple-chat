import { createAction } from 'redux-actions';
import { postChannel, patchChannel } from '../requests';

export const applyChannelSet = createAction('APPLY_CHANNEL_SET');

export const addChannelRequest = createAction('ADD_CHANNEL_REQUEST');
export const addChannelSuccess = createAction('ADD_CHANNEL_SUCCESS');
export const addChannelFailure = createAction('ADD_CHANNEL_FAILURE');

export const addChannel = name => async (dispatch) => {
  dispatch(addChannelRequest());
  try {
    await postChannel(name);
    dispatch(addChannelSuccess());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    dispatch(addChannelFailure());
  }
};

export const receiveNewChannel = createAction('RECEIVE_NEW_CHANNEL');

export const renameChannelRequest = createAction('RENAME_CHANNEL_REQUEST');
export const renameChannelSuccess = createAction('RENAME_CHANNEL_SUCCESS');
export const renameChannelFailure = createAction('RENAME_CHANNEL_FAILURE');

export const renameChannel = (cid, name) => async (dispatch) => {
  dispatch(renameChannelRequest(cid, name));
  try {
    await patchChannel(cid, name);
    dispatch(renameChannelSuccess(cid, name));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    dispatch(renameChannelFailure(cid, name));
  }
};
