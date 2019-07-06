import React from 'react';
import { Row, Col } from 'react-bootstrap';
import classnames from 'classnames';
import { connect } from './util';

const getMessageArrayByCID = (messages, cid) => {
  const messagesById = messages[cid] || {};
  return Object.keys(messagesById)
    .sort((a, b) => a - b)
    .map(id => messagesById[id]);
};

const mapStateToProps = ({ data: { messages }, ui: { currentCID }, username }) => ({
  messages: getMessageArrayByCID(messages, currentCID),
  ownName: username,
});

const Message = ({ username, body, ownName }) => {
  const className = classnames({
    'pr-2': true,
    'text-success': username === ownName,
  });
  return (
    <p className="m-2 p-1">
      <strong className={className}>{`${username}:`}</strong>
      <span>{body}</span>
    </p>
  );
};

const Messages = ({ messages, ownName }) => (
  <Row>
    <Col>
      {messages.map(message => (
        <Message {...message} ownName={ownName} key={message.id} />
      ))}
    </Col>
  </Row>
);

export default connect(mapStateToProps)(Messages);
