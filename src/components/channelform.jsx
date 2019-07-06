import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Field } from 'redux-form';
import classnames from 'classnames';

class ChannelForm extends React.Component {
  submit = async ({ name }) => {
    const { reset } = this.props;
    await this.send(name);
    this.close();
    reset();
  };

  close = () => {
    const { closeChannelDialog } = this.props;
    closeChannelDialog();
  };

  send = () => {};

  render() {
    const {
      error, handleSubmit, pristine, show, submitting,
    } = this.props;
    const fieldProps = {
      className: classnames({ 'form-control': true, 'is-invalid': error }),
      component: 'input',
      name: 'name',
      placeholder: 'Channel name',
      props: { disabled: submitting },
      required: true,
      type: 'text',
    };
    return (
      <Modal show={show} backdrop="static">
        <Modal.Body>
          <Form onSubmit={handleSubmit(this.submit)}>
            <Field {...fieldProps} />
            <div className="invalid-feedback">{`Failed to save data: ${error}`}</div>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.close} disabled={submitting}>
                Close
              </Button>
              <Button variant="primary" type="submit" disabled={pristine || submitting}>
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ChannelForm;
