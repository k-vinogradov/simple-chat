import axios from 'axios';

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
  return data.reduce((acc, { id, attributes }) => ({ ...acc, [id]: attributes }), {});
};

export const postChannel = async name => axios.post(apiUrl(), { data: { attributes: { name } } });

export const patchChannel = async (cid, name) => {
  const url = channels(cid);
  return axios.patch(url, { data: { attributes: { name } } });
};

export const deleteChannel = async cid => axios.delete(channels(cid));
