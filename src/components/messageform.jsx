import React from 'react';
import { Field, SubmissionError } from 'redux-form';
import {
  Row, Col, Form, InputGroup, Button,
} from 'react-bootstrap';
import classnames from 'classnames';
import { connect, reduxForm } from './util';
import { sendMessage } from '../api';

const mapStateToProps = ({ ui: { currentCID }, username }) => ({ currentCID, username });

@connect(mapStateToProps)
@reduxForm('newMessage')
class MessageForm extends React.Component {
  submit = async ({ body }) => {
    const { currentCID: cid, username, reset } = this.props;
    try {
      await sendMessage({ cid, username, body });
    } catch (error) {
      throw new SubmissionError({ _error: error.message });
    }
    reset();
  };

  render() {
    const {
      error, handleSubmit, pristine, submitting,
    } = this.props;
    const className = classnames({ 'form-control': true, 'is-invalid': error });
    return (
      <Row>
        <Col>
          <Form onSubmit={handleSubmit(this.submit)} className="m-2">
            <InputGroup>
              <Field
                props={{ disabled: submitting }}
                name="body"
                required
                component="input"
                type="text"
                className={className}
                placeholder="New message"
                aria-describedby="sendButton"
              />
              <div className="input-group-append">
                <Button type="submit" id="sendButton" disabled={pristine || submitting}>
                  Send
                </Button>
              </div>
              <div className="invalid-feedback">{`Failed: ${error}`}</div>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default MessageForm;
