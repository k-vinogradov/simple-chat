import React from 'react';
import { Field, Form } from 'redux-form';
import {
  Row, Col, InputGroup, Button,
} from 'react-bootstrap';
import classnames from 'classnames';
import { connect, reduxForm } from './util';
import { sendMessage } from '../api';

const mapStateToProps = ({ ui: { currentCID: cid }, username }) => ({
  cid,
  destroyOnUnmount: false,
  form: `messageForm${cid}`,
  username,

  // workaround to avoid https://github.com/erikras/redux-form/issues/2886
  key: cid,
});

@connect(mapStateToProps)
@reduxForm()
class MessageForm extends React.Component {
  submit = async ({ body }) => {
    const { cid, username, reset } = this.props;
    await sendMessage({ cid, username, body });
    reset();
  };

  render() {
    const {
      error, handleSubmit, pristine, submitting,
    } = this.props;
    const fieldProps = {
      'aria-describedby': 'sendButton',
      className: classnames({ 'form-control': true, 'is-invalid': error }),
      component: 'input',
      name: 'body',
      placeholder: 'New message',
      props: { disabled: submitting },
      required: true,
      type: 'text',
    };
    return (
      <Row>
        <Col>
          <Form onSubmit={handleSubmit(this.submit)} className="m-2">
            <InputGroup>
              <Field {...fieldProps} />
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
