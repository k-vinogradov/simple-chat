import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  Row, Col, Form, InputGroup, Button,
} from 'react-bootstrap';
import classnames from 'classnames';
import { postMessage as postMessageAction } from '../actions';

const actionCreators = {
  postMessage: postMessageAction,
};

const mapStateToProps = ({ ui: { channels, currentCID } }) => ({
  ...channels[currentCID],
});

class MessageForm extends React.Component {
  submit = ({ text }) => {
    const { postMessage } = this.props;
    postMessage(text);
  };

  render() {
    const { handleSubmit, state } = this.props;
    const disabled = state === 'sending';
    const inputClassName = classnames({
      'form-control': true,
      'is-invalid': state === 'error',
    });
    return (
      <Row>
        <Col>
          <Form onSubmit={handleSubmit(this.submit)} className="m-2">
            <InputGroup>
              <Field
                props={{ disabled }}
                name="text"
                required
                component="input"
                type="text"
                className={inputClassName}
                placeholder="New message"
                aria-describedby="sendButton"
              />
              <div className="input-group-append">
                <Button variant="secondary" type="submit" id="sendButton">
                  Send
                </Button>
              </div>
              <div className="invalid-feedback">Failed to send the message</div>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default connect(
  mapStateToProps,
  actionCreators,
)(reduxForm({ form: 'newMessage' })(MessageForm));
