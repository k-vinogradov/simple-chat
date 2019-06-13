import axios from 'axios';

const apiUrl = path => `/api/v1${path}`;

export const sendMessage = async (message) => {
  const { cid } = message;
  const url = apiUrl(`/channels/${cid}/messages`);
  return axios.post(url, { data: { attributes: { ...message } } });
};

export const getChannels = async () => {
  const { data } = await axios.get(apiUrl('/channels'));
  const allCIDs = data.map(({ id }) => id);
  const byCID = data.reduce((acc, channel) => ({ ...acc, [channel.id]: channel }), {});
  return { allCIDs, byCID };
};

export const getMessages = async (cid) => {
  const url = apiUrl(`/channels/${cid}/messages`);
  const { data } = await axios.get(url);
  return data.reduce((acc, { id, attributes }) => ({ ...acc, [id]: attributes }), {});
};

export const postChannel = async (name) => {
  const url = apiUrl('/channels');
  return axios.post(url, { data: { attributes: { name } } });
};

export const patchChannel = async (cid, name) => {
  const url = apiUrl(`/channels/${cid}`);
  return axios.patch(url, { data: { attributes: { name } } });
};
