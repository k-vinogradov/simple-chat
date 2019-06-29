import ReactDOM from 'react-dom';
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import Cookies from 'js-cookie';
import { name } from 'faker';
import _ from 'lodash';
import thunk from 'redux-thunk';
import App from './components';
import reducers from './reducers';

const setUsername = () => {
  const username = name.findName();
  Cookies.set('username', username);
  return username;
};

const buildInitialState = (channels, messages, currentCID) => {
  const allCIDs = channels.map(({ id }) => id);
  const username = Cookies.get('username') || setUsername();
  return {
    data: {
      channels: { allCIDs, byCID: _.keyBy(channels, ({ id }) => id) },
      messages: messages.reduce((acc, message) => {
        const { cid, id } = message;
        const stored = acc[cid] || {};
        return { ...acc, [cid]: { ...stored, [id]: message } };
      }, {}),
    },
    ui: {
      channelFormDialogState: { state: 'inactive', cid: null },
      channelDeleteDialogState: { state: 'inactive', cid: null },
      currentCID,
    },
    username,
  };
};

const makeStore = (channels, messages, currentCID) => {
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const state = buildInitialState(channels, messages, currentCID);
  return createStore(reducers, state, composeEnhancers(applyMiddleware(thunk)));
};

const app = ({ channels, messages, currentCID }) => {
  ReactDOM.render(
    <Provider store={makeStore(channels, messages, currentCID)}>
      <App />
    </Provider>,
    document.getElementById('chat'),
  );
};

export default app;
