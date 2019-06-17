import { createAction } from 'redux-actions';
import { sendMessage } from '../api';

export const updateMessages = createAction('UPDATE_MESSAGES');

export const postMessageRequest = createAction('POST_MESSAGE_REQUEST');
export const postMessageSuccess = createAction('POST_MESSAGE_SUCCESS');
export const postMessageFailure = createAction('POST_MESSAGE_FAILURE');

export const postMessage = body => async (dispatch, getState) => {
  const {
    ui: { currentCID },
    username,
  } = getState();
  const message = { cid: currentCID, username, body };
  dispatch(postMessageRequest(message));
  try {
    await sendMessage(message);
    dispatch(postMessageSuccess({ ...message, getCurrentCID: () => getState().ui.currentCID }));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    dispatch(postMessageFailure(message));
  }
};
