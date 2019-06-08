import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import _ from 'lodash';
import classnames from 'classnames';

const mapStateToProps = ({ data: { messages }, ui: { currentCID }, username }) => ({
  messages: _.get(messages, currentCID, []),
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
