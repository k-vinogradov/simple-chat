import { createAction } from 'redux-actions';
import { change, reset } from 'redux-form';
import _ from 'lodash';
import { sendMessage } from './requests';

const updateFormCache = (dispatch, text) => dispatch(change('newMessage', 'text', text));

export const receiveMessage = createAction('RECEIVE_MESSAGE');

export const channelSelected = createAction('CHANNEL_SELECTED');
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
    dispatch(postMessageSuccess(message));
    dispatch(reset('newMessage'));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    dispatch(postMessageFailure(message));
  }
};

export const selectChannel = cid => (dispatch, getState) => {
  const cache = _.get(getState(), `ui.cache.${cid}`, '');
  updateFormCache(dispatch, cache);
  dispatch(channelSelected(cid));
};
