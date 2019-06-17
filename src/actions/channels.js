import { createAction } from 'redux-actions';
import { postChannel, patchChannel, deleteChannel as deleteChannelQuery } from '../requests';

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

export const pushChannelToState = createAction('PUSH_CHANNEL_TO_STATE');
export const renameChannelRequest = createAction('RENAME_CHANNEL_REQUEST');
export const renameChannelSuccess = createAction('RENAME_CHANNEL_SUCCESS');
export const renameChannelFailure = createAction('RENAME_CHANNEL_FAILURE');

export const renameChannel = (cid, name) => async (dispatch) => {
  dispatch(renameChannelRequest({ cid, name }));
  try {
    await patchChannel(cid, name);
    dispatch(renameChannelSuccess({ cid, name }));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    dispatch(renameChannelFailure({ cid, name }));
  }
};

export const deleteChannelRequest = createAction('DELETE_CHANNEL_REQUEST');
export const deleteChannelSuccess = createAction('DELETE_CHANNEL_SUCCESS');
export const deleteChannelFailure = createAction('DELETE_CHANNEL_FAILURE');

export const deleteChannel = cid => async (dispatch) => {
  dispatch(deleteChannelRequest());
  try {
    await deleteChannelQuery(cid);
    dispatch(deleteChannelSuccess());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    dispatch(deleteChannelFailure());
  }
};

export const removeChannelFromState = createAction('REMOVE_CHANNEL_FROM_STATE');
