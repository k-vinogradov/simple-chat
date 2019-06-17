import React from 'react';
import { Field } from 'redux-form';
import {
  Row, Col, Form, InputGroup, Button,
} from 'react-bootstrap';
import classnames from 'classnames';
import { connect, isLockedState, reduxForm } from './util';

const mapStateToProps = ({ ui: { messageFormState, globalUiState } }) => {
  const disabled = isLockedState(globalUiState);
  return { disabled, messageFormState };
};

@connect(mapStateToProps)
@reduxForm('newMessage')
class MessageForm extends React.Component {
  submit = ({ text }) => {
    const { postMessage } = this.props;
    postMessage(text);
  };

  render() {
    const { handleSubmit, messageFormState, disabled } = this.props;
    const inputClassName = classnames({
      'form-control': true,
      'is-invalid': messageFormState === 'error',
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
                <Button variant="secondary" type="submit" id="sendButton" disabled={disabled}>
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

export default MessageForm;
