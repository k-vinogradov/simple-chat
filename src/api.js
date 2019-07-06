import axios from 'axios';
import _ from 'lodash';
import { SubmissionError } from 'redux-form';

const apiUrl = (...path) => `/api/v1/channels/${path.join('/')}`;
const channels = apiUrl;
const messages = cid => apiUrl(cid, 'messages');

const sendMessageMethod = async (message) => {
  const { cid } = message;
  const url = messages(cid);
  return axios.post(url, { data: { attributes: { ...message } } });
};

export const getChannels = async () => {
  const { data } = await axios.get(channels());
  const allCIDs = data.map(({ id }) => id);
  const byCID = data.reduce((acc, channel) => ({ ...acc, [channel.id]: channel }), {});
  return { allCIDs, byCID };
};

export const getMessages = async (cid) => {
  const url = messages(cid);
  const { data } = await axios.get(url);
  const messageArray = data.map(({ attributes }) => attributes);
  return _.keyBy(messageArray, ({ id }) => id);
};

const postChannelMethod = async name => axios.post(apiUrl(), { data: { attributes: { name } } });

const patchChannelMethod = async (name, cid) => {
  const url = channels(cid);
  return axios.patch(url, { data: { attributes: { name } } });
};

const deleteChannelMethod = async cid => axios.delete(channels(cid));

export const formSubmitWrapper = call => async (...args) => {
  try {
    await call(...args);
  } catch ({ message }) {
    throw new SubmissionError({ _error: message });
  }
};

export const deleteChannel = formSubmitWrapper(deleteChannelMethod);
export const patchChannel = formSubmitWrapper(patchChannelMethod);
export const postChannel = formSubmitWrapper(postChannelMethod);
export const sendMessage = formSubmitWrapper(sendMessageMethod);
