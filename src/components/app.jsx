import React from 'react';
import io from 'socket.io-client';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import Sidebar from './sidebar';
import Messages from './messages';
import MessageForm from './messageform';
import * as actions from '../actions';

const actionCreators = {
  receiveMessage: actions.receiveMessage,
};

const mapStateToProps = ({ username }) => ({ username });

class App extends React.Component {
  componentDidMount() {
    const socket = io();
    const { receiveMessage } = this.props;
    socket.on('newMessage', ({ data: { attributes } }) => receiveMessage(attributes));
  }

  render() {
    const { username } = this.props;
    return (
      <React.Fragment>
        <Row>
          <Col>
            <h2 className="m-3">{username}</h2>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <Sidebar />
          </Col>
          <Col>
            <Messages />
            <MessageForm />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  actionCreators,
)(App);
