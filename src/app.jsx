import ReactDOM from 'react-dom';
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Sidebar from './components/sidebar';

class App extends React.Component {
  constructor(props) {
    super(props);
    const { channels, messages, currentChannelId } = props;
    this.state = { channels, messages, currentChannelId };
  }

  onChannelSelected = cid => () => this.setState({ currentChannelId: cid });

  render() {
    const { channels, currentChannelId } = this.state;
    return (
      <Row>
        <Col xs={3}>
          <Sidebar
            channels={channels}
            currentChannelId={currentChannelId}
            onChannelSelected={this.onChannelSelected}
          />
        </Col>
        <Col />
      </Row>
    );
  }
}

const app = (gon) => {
  const mountNode = document.getElementById('chat');
  ReactDOM.render(<App {...gon} />, mountNode);
};

export default app;
