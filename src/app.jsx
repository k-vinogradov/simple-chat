import ReactDOM from 'react-dom';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Sidebar } from './components';
import reducers from './reducers';

const buildInitialState = ({ channels, messages, currentChannelId }) => ({
  channels: {
    allCIDs: channels.map(({ id }) => id),
    byCID: channels.reduce((acc, channel) => ({ ...acc, [channel.id]: channel }), {}),
    activeCID: currentChannelId,
  },
});

const app = (gon) => {
  const mountNode = document.getElementById('chat');
  // eslint-disable-next-line no-underscore-dangle
  const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__;
  const store = createStore(reducers, buildInitialState(gon), reduxDevtools && reduxDevtools());
  ReactDOM.render(
    <Provider store={store}>
      <Row>
        <Col xs={3}>
          <Sidebar />
        </Col>
        <Col />
      </Row>
    </Provider>,
    mountNode,
  );
};

export default app;
