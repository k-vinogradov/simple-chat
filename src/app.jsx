import ReactDOM from 'react-dom';
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import Cookies from 'js-cookie';
import { name } from 'faker';
import thunk from 'redux-thunk';
import { App } from './components';
import reducers from './reducers';

const setUsername = () => {
  const username = name.findName();
  Cookies.set('username', username);
  return username;
};

const buildInitialState = ({ channels, messages, currentCID }) => {
  const allCIDs = channels.map(({ id }) => id);
  const username = Cookies.get('username') || setUsername();
  return {
    data: {
      channels: {
        allCIDs,
        byCID: channels.reduce((acc, channel) => ({ ...acc, [channel.id]: channel }), {}),
      },
      messages: messages.reduce((acc, message) => {
        const { cid, id } = message;
        const stored = acc[cid] || {};
        return { ...acc, [cid]: { ...stored, [id]: message } };
      }, {}),
    },
    ui: {
      globalUiState: 'normal',
      messageFormState: 'ok',
      channelFormDialogState: { state: 'ok', cid: null },
      channelDeleteDialogState: { state: 'ok', cid: null },
      currentCID,
    },
    username,
  };
};

const makeStore = (gon) => {
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const state = buildInitialState(gon);
  return createStore(reducers, state, composeEnhancers(applyMiddleware(thunk)));
};

const app = (gon) => {
  ReactDOM.render(
    <Provider store={makeStore(gon)}>
      <App gon={gon} />
    </Provider>,
    document.getElementById('chat'),
  );
};

export default app;
