import axios from 'axios';
import _ from 'lodash';

const apiUrl = (...path) => `/api/v1/channels/${path.join('/')}`;
const channels = apiUrl;
const messages = cid => apiUrl(cid, 'messages');

export const sendMessage = async (message) => {
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

export const postChannel = async name => axios.post(apiUrl(), { data: { attributes: { name } } });

export const patchChannel = async (name, cid) => {
  const url = channels(cid);
  return axios.patch(url, { data: { attributes: { name } } });
};

export const deleteChannel = async cid => axios.delete(channels(cid));
