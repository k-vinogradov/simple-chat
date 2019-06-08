import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const sendMessage = async (message) => {
  const { cid } = message;
  const url = `/api/v1/channels/${cid}/messages`;
  return axios.post(url, { data: { attributes: { ...message } } });
};
