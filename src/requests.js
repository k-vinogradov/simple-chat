import axios from 'axios';

const apiUrl = ([...path]) => `/api/v1/channels/${path.join('/')}`;

export const sendMessage = async (message) => {
  const { cid } = message;
  const url = apiUrl(cid, 'messages');
  return axios.post(url, { data: { attributes: { ...message } } });
};

export const getChannels = async () => {
  const { data } = await axios.get(apiUrl());
  const allCIDs = data.map(({ id }) => id);
  const byCID = data.reduce((acc, channel) => ({ ...acc, [channel.id]: channel }), {});
  return { allCIDs, byCID };
};

export const getMessages = async (cid) => {
  const url = apiUrl(cid, 'messages');
  const { data } = await axios.get(url);
  return data.reduce((acc, { id, attributes }) => ({ ...acc, [id]: attributes }), {});
};

export const postChannel = async name => axios.post(apiUrl(), { data: { attributes: { name } } });

export const patchChannel = async (cid, name) => {
  const url = apiUrl(cid);
  return axios.patch(url, { data: { attributes: { name } } });
};

export const deleteChannel = async cid => axios.delete(apiUrl(`/channels/${cid}`));
