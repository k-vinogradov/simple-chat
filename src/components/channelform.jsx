import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Field, SubmissionError } from 'redux-form';
import classnames from 'classnames';
import { connect, reduxForm } from './util';
import { postChannel, patchChannel } from '../api';

const mapStateToProps = ({
  data: {
    channels: { byCID },
  },
  ui: {
    channelFormDialogState: { state, cid },
  },
}) => ({
  apiMethod: state === 'new' ? postChannel : patchChannel,
  cid,
  name: state === 'rename' ? byCID[cid].name : '',
  show: state !== 'inactive',
});

@connect(mapStateToProps)
@reduxForm('channelForm')
class ChannelForm extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { initialize, name, submitting } = nextProps;
    if (!submitting) initialize({ name }, true);
    return true;
  }

  submit = async ({ name }) => {
    const {
      cid, reset, closeChannelDialog, apiMethod,
    } = this.props;
    try {
      await apiMethod(name, cid);
    } catch ({ message }) {
      throw new SubmissionError({ _error: message });
    }
    closeChannelDialog();
    reset();
  };

  close = () => {
    const { reset, closeChannelDialog } = this.props;
    reset();
    closeChannelDialog();
  };

  render() {
    const {
      error, handleSubmit, pristine, show, submitting,
    } = this.props;
    const fieldClassName = classnames({ 'form-control': true, 'is-invalid': error });
    return (
      <Modal show={show} backdrop="static">
        <Modal.Body>
          <Form onSubmit={handleSubmit(this.submit)}>
            <Form.Group controlId="formBasicEmail">
              <Field
                props={{ disabled: submitting }}
                name="name"
                required
                component="input"
                type="text"
                className={fieldClassName}
                placeholder="Channel name"
              />
              <div className="invalid-feedback">{`Failed to save data: ${error}`}</div>
            </Form.Group>
            <Modal.Footer>
              <Button
                variant="secondary"
                id="closeChannelForm"
                onClick={this.close}
                disabled={submitting}
              >
                Close
              </Button>
              <Button
                variant="primary"
                id="submitChannelForm"
                type="submit"
                disabled={pristine || submitting}
              >
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
